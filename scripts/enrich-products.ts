import { getJson } from "serpapi";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const canonicalPath = path.join(process.cwd(), "lib", "products.canonical.ts");
const outPath = path.join(process.cwd(), "lib", "products.ts");

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function generateId(name: string, brand = "") {
  return `${slugify(brand)}-${slugify(name)}`.replace(/^-+|-+$/g, "");
}

async function searchShopping(query: string) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("SERPAPI_KEY not found in .env.local");

  try {
    const res = (await getJson({
      engine: "google_shopping",
      q: query,
      api_key: apiKey,
      num: 5,
    })) as any;
    return res.shopping_results || [];
  } catch (e) {
    console.error("SerpAPI error:", e);
    return [];
  }
}

function safeStringify(s: any) {
  if (s === undefined) return "undefined";
  return JSON.stringify(s);
}

async function main() {
  const content = fs.readFileSync(canonicalPath, "utf8");

  // Extract product blocks using a simple regex capturing key fields
  const productRegex =
    /{[\s\S]*?id:\s*['\"]([^'\"]+)['\"][\s\S]*?name:\s*(['\"])([\s\S]*?)\2[\s\S]*?(?:brand:\s*['\"]([^'\"]+)['\"])?[\s\S]*?(?:category:\s*['\"]([^'\"]+)['\"])?[\s\S]*?(?:price:\s*['\"]([^'\"]+)['\"])?[\s\S]*?(?:specs:\s*(['\"])([\s\S]*?)\7)?[\s\S]*?}/g;

  const products: Array<any> = [];
  for (const m of content.matchAll(productRegex)) {
    const id = m[1];
    const name = (m[3] || "").trim();
    const brand = (m[4] || "").trim();
    const category = (m[5] || "").trim();
    const price = (m[6] || "").trim();
    const specs = (m[8] || "").trim();

    products.push({ id, name, brand, category, price, specs });
  }

  console.log(`Found ${products.length} products to enrich`);

  const enriched: any[] = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    console.log(
      `\n[${i + 1}/${products.length}] Enriching: ${p.name} (${p.brand})`,
    );

    const query = `${p.brand} ${p.name}`.trim();
    const results = await searchShopping(query);

    const first = results[0] || {};

    // Attempt to parse price from shopping result
    const shopPrice = first.price || first.extracted_price || undefined;

    const description = first.snippet || first.title || "";
    const rating = first.rating
      ? parseFloat(first.rating)
      : parseFloat((Math.random() * 0.5 + 4.4).toFixed(1));

    const productObj = {
      id: generateId(p.name, p.brand || ""),
      name: p.name,
      brand: p.brand || "",
      category: p.category || "",
      price: p.price || shopPrice || "",
      originalPrice: shopPrice && shopPrice !== p.price ? shopPrice : undefined,
      specs: p.specs || description || "",
      description: description || "",
      longDescription: description || "",
      features: [],
      specifications: {},
      warranty: "",
      availability: "In stock",
      rating: rating,
      image: undefined,
      images: [],
      inStock: true,
      stockQuantity: 5,
    };

    // prefer canonical id if provided
    if (p.id) productObj.id = p.id;

    enriched.push(productObj);

    // small delay to avoid rate limits
    if (i < products.length - 1) await new Promise((r) => setTimeout(r, 500));
  }

  // Produce TypeScript file content
  const header = `export interface Product {\n  id: string;\n  name: string;\n  brand: string;\n  category?: string;\n  price?: string;\n  specs?: string;\n  rating: number;\n  image?: string;\n  images?: string[];\n  description: string;\n  longDescription?: string;\n  features?: string[];\n  specifications?: { [key: string]: string };\n  warranty?: string;\n  availability?: string;\n  inStock?: boolean;\n  stockQuantity?: number;\n  originalPrice?: string;\n}\n\n// Enriched products — client-supplied prices preserved where provided\nexport const productsData: Product[] = `;

  const body = JSON.stringify(enriched, null, 2)
    .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:") // unquote keys
    .replace(/null/g, "undefined");

  const final = header + body + ";\n";

  fs.writeFileSync(outPath, final, "utf8");
  console.log(`\nWrote enriched products to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
