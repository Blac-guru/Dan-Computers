import { getJson } from "serpapi";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// Load the products file
const productsFilePath = path.join(process.cwd(), "lib", "products.ts");

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&");
}

interface SerpApiImageResult {
  images_results?: Array<{
    original: string;
    title?: string;
    link?: string;
    thumbnail?: string;
  }>;
}

async function fetchImagesForProduct(
  productName: string,
  brand: string,
  maxImages = 4,
): Promise<string[]> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error("SERPAPI_KEY is not defined in environment variables");
  }

  const searchQuery = `${brand} ${productName} official product`;
  console.log(`🔍 Searching for: "${searchQuery}" (want ${maxImages} images)`);

  try {
    const response = (await getJson({
      engine: "google_images",
      q: searchQuery,
      api_key: apiKey,
      num: 8,
    })) as SerpApiImageResult;

    const urls: string[] = [];
    if (response.images_results && response.images_results.length > 0) {
      for (const result of response.images_results) {
        const imageUrl = result.original;
        if (
          imageUrl &&
          (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) &&
          !urls.includes(imageUrl)
        ) {
          urls.push(imageUrl);
          if (urls.length >= maxImages) break;
        }
      }
    }

    if (urls.length === 0) {
      console.log(`❌ No valid images found for "${searchQuery}"`);
    } else {
      console.log(`✅ Found ${urls.length} images for "${searchQuery}"`);
    }
    return urls;
  } catch (error) {
    console.error(`❌ Error fetching images for "${searchQuery}":`, error);
    return [];
  }
}

async function updateProductsFile() {
  console.log("📖 Reading products file...");
  const fileContent = fs.readFileSync(productsFilePath, "utf-8");

  // Parse products from the file using a regex that doesn't require the dotAll flag
  const productMatches = fileContent.matchAll(
    /{\s*id:\s*['\"]([^'\"]+)['\"][\s\S]*?name:\s*(['\"][\s\S]*?['\"])[\s\S]*?brand:\s*['\"]([^'\"]+)['\"][\s\S]*?}/g,
  );

  const products: Array<{ id: string; name: string; brand: string }> = [];

  for (const match of productMatches) {
    // Remove quotes from the name field
    const name = match[2].replace(/^['\"]|['\"]$/g, "");
    products.push({
      id: match[1],
      name: name,
      brand: match[3],
    });
  }

  console.log(`📦 Found ${products.length} products to process\n`);

  let updatedContent = fileContent;
  let successCount = 0;
  let failCount = 0;

  // Force-refresh images for all products
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    console.log(
      `\n[${i + 1}/${products.length}] Processing: ${product.name} (${product.brand})`,
    );

    const images = await fetchImagesForProduct(product.name, product.brand, 4);

    if (images.length > 0) {
      const imagesArrayReplacement = `[${images.map((u) => JSON.stringify(u)).join(", ")}]`;

      // Replace existing `images: [...]` if present
      const imagesArrayRegex = new RegExp(
        `(id:\\s*['\"]${escapeRegExp(product.id)}['\"][\\s\\S]*?images:\s*)\[[\\s\\S]*?\]`,
      );

      if (imagesArrayRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(
          imagesArrayRegex,
          `$1${imagesArrayReplacement}`,
        );
      }

      // Replace existing `image: '...'` if present
      const imageFieldRegex = new RegExp(
        `(id:\\s*['\"]${escapeRegExp(product.id)}['\"][\\s\\S]*?image:\s*)['\"][^'\"]*['\"]`,
      );

      if (imageFieldRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(
          imageFieldRegex,
          `$1${JSON.stringify(images[0])}`,
        );
      } else if (!imagesArrayRegex.test(updatedContent)) {
        // If neither image nor images present, insert both before the closing brace of the product object
        const productBlockRegex = new RegExp(
          `(id:\\s*['\"]${escapeRegExp(product.id)}['\"][\\s\\S]*?)(\\n\\s*}\\s*,?)`,
        );
        const prodMatch = updatedContent.match(productBlockRegex);
        if (prodMatch) {
          const insertion = `,\\n      images: ${imagesArrayReplacement},\\n      image: ${JSON.stringify(images[0])}`;
          updatedContent = updatedContent.replace(
            productBlockRegex,
            `$1${insertion}$2`,
          );
        } else {
          console.log(`⚠️  Could not find insertion point for ${product.name}`);
          failCount++;
          continue;
        }
      }

      successCount++;
      console.log(`✅ Updated images for ${product.name}`);
    } else {
      console.log(`❌ No images found for ${product.name}`);
      failCount++;
    }

    // Add a small delay between requests to avoid rate limiting (500ms)
    if (i < products.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // Write the updated content back to the file
  console.log("\n💾 Writing updated products file...");
  fs.writeFileSync(productsFilePath, updatedContent, "utf-8");

  console.log("\n✨ Done!");
  console.log(`✅ Successfully updated: ${successCount} products`);
  console.log(`❌ Failed: ${failCount} products`);
}

// Main execution
console.log("🚀 Starting product image fetcher...\n");
updateProductsFile()
  .then(() => {
    console.log("\n✅ Process completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Process failed:", error);
    process.exit(1);
  });
