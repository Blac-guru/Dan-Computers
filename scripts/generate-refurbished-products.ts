import { getJson } from "serpapi";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const productsFilePath = path.join(process.cwd(), "lib", "products.ts");

interface SearchResult {
  title: string;
  link?: string;
  price?: string;
  image?: string;
  rating?: string;
}

interface SearchApiResponse {
  shopping_results?: SearchResult[];
  organic_results?: Array<SearchResult & { snippet?: string }>;
}

// Refurbished product pricing strategy
const pricingStrategy = {
  laptops: { min: 15000, max: 60000 },
  desktops: { min: 8000, max: 24000 },
  monitors: { min: 8000, max: 45000 },
  printers: { min: 5000, max: 35000 },
  cameras: { min: 8000, max: 50000 },
  accessories: { min: 800, max: 8000 },
};

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  originalPrice: string;
  specs: string;
  rating: number;
  image: string;
  images?: string[];
  description: string;
  longDescription: string;
  features: string[];
  specifications: { [key: string]: string };
  warranty: string;
  availability: string;
  inStock: boolean;
  stockQuantity: number;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function generateId(name: string, brand: string): string {
  const base = `${slugify(brand)}-${slugify(name)}`;
  return base;
}

function getRandomPrice(
  min: number,
  max: number,
): { price: string; originalPrice: string } {
  const price = Math.floor(Math.random() * (max - min + 1)) + min;
  // Add 20-40% markup for original price
  const markup = Math.floor(Math.random() * 20) + 20;
  const originalPrice = Math.floor(price * (1 + markup / 100));

  return {
    price: `${price.toLocaleString()} KES`,
    originalPrice: `${originalPrice.toLocaleString()} KES`,
  };
}

function getRandomRating(): number {
  return parseFloat((Math.random() * 0.5 + 4.4).toFixed(1)); // 4.4 - 4.9
}

async function searchProducts(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_KEY not found in environment");
  }

  console.log(`🔍 Searching: "${query}"`);

  try {
    const response = (await getJson({
      engine: "google_shopping",
      q: query,
      api_key: apiKey,
      num: 10,
    })) as SearchApiResponse;

    if (response.shopping_results && response.shopping_results.length > 0) {
      return response.shopping_results;
    }
    return [];
  } catch (error) {
    console.error(`❌ Error searching for "${query}":`, error);
    return [];
  }
}

async function searchImageForProduct(
  productName: string,
  brand: string,
): Promise<string[]> {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_KEY not found in environment");
  }

  try {
    const response = (await getJson({
      engine: "google_images",
      q: `${brand} ${productName} refurbished product`,
      api_key: apiKey,
      num: 10,
    })) as any;

    const images: string[] = [];
    if (response.images_results && response.images_results.length > 0) {
      for (const img of response.images_results) {
        const url = img.original;
        if (url && (url.startsWith("https://") || url.startsWith("http://"))) {
          images.push(url);
          if (images.length >= 4) break; // Get up to 4 images
        }
      }
    }
    return images;
  } catch (error) {
    console.log(`⚠️ Could not fetch images for ${productName}`);
  }

  return [];
}

async function generateRefurbishedProducts(): Promise<Product[]> {
  const products: Product[] = [];
  const existingIds = new Set<string>();
  const seenTitles = new Set<string>();

  // Define refurbished product searches
  const searches = [
    // Laptops (11 total)
    { query: "refurbished Dell laptop i7", category: "laptops", count: 3 },
    { query: "refurbished HP laptop", category: "laptops", count: 3 },
    { query: "refurbished MacBook Pro", category: "laptops", count: 2 },
    { query: "refurbished Lenovo ThinkPad", category: "laptops", count: 3 },

    // Desktops (10 total)
    { query: "refurbished Dell desktop", category: "desktops", count: 3 },
    { query: "refurbished HP desktop", category: "desktops", count: 2 },
    { query: "refurbished gaming desktop", category: "desktops", count: 3 },
    { query: "refurbished Lenovo desktop", category: "desktops", count: 2 },

    // Monitors (11 total)
    { query: "refurbished 24 inch monitor", category: "monitors", count: 3 },
    { query: "refurbished 27 inch monitor", category: "monitors", count: 3 },
    { query: "refurbished gaming monitor", category: "monitors", count: 2 },
    { query: "refurbished ultrawide monitor", category: "monitors", count: 3 },

    // Printers (10 total)
    { query: "refurbished all-in-one printer", category: "printers", count: 3 },
    { query: "refurbished laser printer", category: "printers", count: 3 },
    { query: "refurbished inkjet printer", category: "printers", count: 2 },
    { query: "refurbished Brother printer", category: "printers", count: 2 },

    // Security Cameras (11 total)
    { query: "refurbished CCTV camera", category: "cameras", count: 3 },
    {
      query: "refurbished security camera system",
      category: "cameras",
      count: 3,
    },
    { query: "refurbished bullet camera", category: "cameras", count: 2 },
    { query: "refurbished dome camera", category: "cameras", count: 3 },

    // Accessories (11 total)
    { query: "refurbished laptop stand", category: "accessories", count: 2 },
    {
      query: "refurbished mechanical keyboard",
      category: "accessories",
      count: 3,
    },
    { query: "refurbished gaming mouse", category: "accessories", count: 2 },
    { query: "refurbished USB hub", category: "accessories", count: 2 },
    {
      query: "refurbished laptop cooling pad",
      category: "accessories",
      count: 2,
    },
  ];

  let totalProducts = 0;

  for (const searchConfig of searches) {
    console.log(
      `\n📦 Searching for ${searchConfig.count} ${searchConfig.category}...`,
    );
    const results = await searchProducts(searchConfig.query);

    if (results.length === 0) {
      console.log(`⚠️ No results for "${searchConfig.query}"`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    // Take only the requested count
    const selectedResults = results.slice(0, searchConfig.count);

    for (const result of selectedResults) {
      const productName = result.title || "Unknown Product";
      const normalizedTitle = productName.trim().toLowerCase();
      if (seenTitles.has(normalizedTitle)) {
        console.log(`  ↩️  Skipping duplicate title: ${productName}`);
        continue;
      }
      seenTitles.add(normalizedTitle);

      const brand = productName.split(" ")[0]; // First word is usually the brand

      console.log(`  ✨ Processing: ${productName}`);

      // Get images
      const images = await searchImageForProduct(productName, brand);
      if (images.length === 0) {
        console.log(`    ⚠️ Skipping - could not get images`);
        continue;
      }
      const image = images[0]; // Primary image

      // Get pricing
      const pricing = getRandomPrice(
        pricingStrategy[searchConfig.category as keyof typeof pricingStrategy]
          ?.min || 5000,
        pricingStrategy[searchConfig.category as keyof typeof pricingStrategy]
          ?.max || 50000,
      );

      // Generate features based on category
      let features: string[] = [];
      let specifications: { [key: string]: string } = {};
      let specs = "";

      switch (searchConfig.category) {
        case "laptops":
          features = [
            "Refurbished - Fully tested & working",
            "Core i5/i7 Processor",
            "8GB - 16GB RAM",
            "256GB - 512GB SSD",
            "Windows 11 Pro / MacOS",
            "1-Year Warranty",
            "Free Antivirus Software",
            "Original Charger Included",
          ];
          specifications = {
            Condition: "Refurbished",
            Processor: "Intel Core i5/i7 or equivalent",
            RAM: "8GB - 16GB",
            Storage: "256GB - 512GB SSD",
            Display: '13" - 15.6" FHD',
            OS: "Windows 11 Pro / MacOS",
            Battery: "Up to 8-10 hours",
          };
          specs = "Refurbished, i5/i7, 8-16GB RAM, 256-512GB SSD";
          break;

        case "desktops":
          features = [
            "Refurbished - Fully tested & working",
            "Intel Core i5/i7 or AMD Ryzen",
            "8GB - 16GB RAM",
            "256GB - 512GB SSD",
            "Windows 11 Pro",
            "1-Year Warranty",
            "All peripherals included",
          ];
          specifications = {
            Condition: "Refurbished",
            Processor: "Intel Core i5/i7 or AMD Ryzen 5/7",
            RAM: "8GB - 16GB DDR4",
            Storage: "256GB - 512GB SSD + HDD",
            OS: "Windows 11 Pro",
            Connectivity: "WiFi 6, Ethernet, Bluetooth",
          };
          specs = "Refurbished, i5/i7, 8-16GB RAM, SSD+HDD";
          break;

        case "monitors":
          features = [
            "Refurbished - Full functionality",
            '24" - 27" display',
            "1080p - 4K resolution",
            "IPS/VA Panel",
            "60Hz - 144Hz refresh rate",
            "1-Year Warranty",
            "HDMI, DisplayPort, USB-C",
          ];
          specifications = {
            Condition: "Refurbished",
            Size: '24" - 27"',
            Resolution: "1080p - 4K",
            "Panel Type": "IPS/VA",
            "Refresh Rate": "60Hz - 144Hz",
            Connectivity: "HDMI, DisplayPort, USB-C",
          };
          specs = "24-27 inch, 1080p-4K, IPS/VA Panel";
          break;

        case "printers":
          features = [
            "Refurbished - Fully functional",
            "Print Speed: 20-38 ppm",
            "Color or Monochrome options",
            "Network & USB connectivity",
            "1-Year Warranty",
            "Includes toner/ink cartridge",
          ];
          specifications = {
            Condition: "Refurbished",
            Type: "Color / Monochrome Laser / Inkjet",
            "Print Speed": "20-38 ppm",
            Connectivity: "USB, Ethernet, WiFi",
            "Monthly Duty Cycle": "10,000-100,000 pages",
          };
          specs = "20-38 ppm, Network Print, Duplex";
          break;

        case "cameras":
          features = [
            "Refurbished - Fully tested",
            "1080p - 5MP resolution",
            "Night vision capability",
            "Motion detection",
            "1-Year Warranty",
            "Cloud & Local storage options",
          ];
          specifications = {
            Condition: "Refurbished",
            Resolution: "1080p - 5MP",
            "Night Vision": "IR LED",
            "Motion Detection": "PIR Sensor",
            Connectivity: "Ethernet, WiFi",
          };
          specs = "1080p-5MP, Night Vision, Motion Detection";
          break;

        case "accessories":
          features = [
            "Refurbished / New",
            "Premium build quality",
            "Full functionality",
            "Compatible with major brands",
            "1-Year Warranty",
          ];
          specifications = {
            Condition: "Refurbished / New",
            Compatibility: "Universal / Brand-specific",
          };
          specs = "High quality, durable design";
          break;
      }

      let id = generateId(productName, brand);
      if (existingIds.has(id)) {
        let suffix = 2;
        while (existingIds.has(`${id}-v${suffix}`)) {
          suffix++;
        }
        id = `${id}-v${suffix}`;
      }
      existingIds.add(id);

      const product: Product = {
        id: id,
        name: productName,
        brand: brand,
        category: searchConfig.category,
        price: pricing.price,
        originalPrice: pricing.originalPrice,
        specs: specs,
        rating: getRandomRating(),
        image: image,
        images: images.length > 1 ? images : [image], // Include multiple images if available
        description: `Refurbished ${productName} - Fully tested, working condition with warranty.`,
        longDescription: `This refurbished ${productName} has been thoroughly tested and certified to work perfectly. All components are functional. Comes with original power adapter and cables where applicable. Includes 1-year warranty covering all hardware defects. Perfect for budget-conscious buyers looking for quality technology at affordable prices.`,
        features: features,
        specifications: specifications,
        warranty: "1 Year Comprehensive Warranty",
        availability: "In Stock",
        inStock: true,
        stockQuantity: Math.floor(Math.random() * 10) + 2,
      };

      products.push(product);
      totalProducts++;

      // Add delay to respect API rate limits
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  console.log(`\n✅ Generated ${totalProducts} refurbished products`);
  return products;
}

function generateProductsFile(products: Product[]): string {
  const productsList = products
    .map((p) => {
      return `  {
    id: "${p.id}",
    name: "${p.name.replace(/"/g, '\\"')}",
    brand: "${p.brand}",
    category: "${p.category}",
    price: "${p.price}",
    originalPrice: "${p.originalPrice}",
    specs: "${p.specs}",
    rating: ${p.rating},
    image: "${p.image}",
    ${p.images && p.images.length > 0 ? `images: [${p.images.map((img) => `"${img.replace(/"/g, '\\"')}"`).join(", ")}],` : ""}
    description:
      "${p.description.replace(/"/g, '\\"')}",
    longDescription:
      "${p.longDescription.replace(/"/g, '\\"')}",
    features: [
      ${p.features.map((f) => `"${f.replace(/"/g, '\\"')}"`).join(",\n      ")},
    ],
    specifications: {
      ${Object.entries(p.specifications)
        .map(([key, value]) => `"${key}": "${value.replace(/"/g, '\\"')}"`)
        .join(",\n      ")},
    },
    warranty: "${p.warranty}",
    availability: "${p.availability}",
    inStock: ${p.inStock},
    stockQuantity: ${p.stockQuantity},
  },`;
    })
    .join("\n");

  return `export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  originalPrice?: string;
  specs: string;
  rating: number;
  image: string;
  images?: string[];
  description: string;
  longDescription: string;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  warranty: string;
  availability: string;
  inStock: boolean;
  stockQuantity: number;
}

export const productsData: Product[] = [
${productsList}
];
\n+// Helper queries
export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}
\n+export function getProductsByCategory(category: string): Product[] {
  const cat = category.toLowerCase();
  return productsData.filter((p) => p.category.toLowerCase() === cat);
}
`;
}

// Main execution
console.log("🚀 Starting Refurbished Products Generator with SerpAPI...\n");

generateRefurbishedProducts()
  .then((products) => {
    console.log("\n💾 Writing products to file...");
    const fileContent = generateProductsFile(products);
    fs.writeFileSync(productsFilePath, fileContent, "utf-8");
    console.log(
      `✅ Successfully updated products.ts with ${products.length} refurbished items`,
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
