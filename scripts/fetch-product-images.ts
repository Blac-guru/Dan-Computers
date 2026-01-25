import { getJson } from "serpapi";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// Load the products file
const productsFilePath = path.join(process.cwd(), "lib", "products.ts");

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  [key: string]: any;
}

interface SerpApiImageResult {
  images_results?: Array<{
    original: string;
    title?: string;
    link?: string;
    thumbnail?: string;
  }>;
}

async function fetchImageForProduct(
  productName: string,
  brand: string,
): Promise<string> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error("SERPAPI_KEY is not defined in environment variables");
  }

  // Create a search query combining brand and product name for better results
  const searchQuery = `${brand} ${productName} official product`;

  console.log(`🔍 Searching for: "${searchQuery}"`);

  try {
    const response = (await getJson({
      engine: "google_images",
      q: searchQuery,
      api_key: apiKey,
      num: 5, // Get top 5 results to choose from
    })) as SerpApiImageResult;

    if (response.images_results && response.images_results.length > 0) {
      // Find the first valid HTTP/HTTPS image URL
      for (const result of response.images_results) {
        const imageUrl = result.original;
        // Validate that the URL is a proper HTTP/HTTPS URL
        if (
          imageUrl &&
          (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
        ) {
          console.log(`✅ Found image: ${imageUrl}`);
          return imageUrl;
        }
      }
      console.log(`❌ No valid HTTP/HTTPS images found for "${searchQuery}"`);
      return "";
    } else {
      console.log(`❌ No images found for "${searchQuery}"`);
      return "";
    }
  } catch (error) {
    console.error(`❌ Error fetching image for "${searchQuery}":`, error);
    return "";
  }
}

async function updateProductsFile() {
  console.log("📖 Reading products file...");
  const fileContent = fs.readFileSync(productsFilePath, "utf-8");

  // Parse products from the file
  // This regex handles both double and single quoted strings, including quotes within the name
  const productMatches = fileContent.matchAll(
    /{\s*id:\s*["']([^"']+)["'],\s*name:\s*(['"][^'"]*['"]|["'][^"']*["']),\s*brand:\s*["']([^"']+)["']/gs,
  );

  const products: Array<{ id: string; name: string; brand: string }> = [];

  for (const match of productMatches) {
    // Remove quotes from the name field
    const name = match[2].replace(/^['"]|['"]$/g, "");
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

  // Process products with a delay to respect rate limits
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Check if product already has a valid image URL
    const currentImageMatch = updatedContent.match(
      new RegExp(
        `id:\\s*["']${product.id}["'][^}]*image:\\s*["']([^"']*)`,
        "s",
      ),
    );

    const currentImage = currentImageMatch ? currentImageMatch[1] : "";
    const hasValidImage =
      currentImage &&
      (currentImage.startsWith("http://") ||
        currentImage.startsWith("https://"));

    if (hasValidImage) {
      console.log(
        `\n[${i + 1}/${products.length}] ⏭️  Skipping ${product.name} - already has valid image`,
      );
      continue;
    }

    console.log(
      `\n[${i + 1}/${products.length}] Processing: ${product.name} (${product.brand})`,
    );

    const imageUrl = await fetchImageForProduct(product.name, product.brand);

    if (imageUrl) {
      // Find and replace the empty image field for this product
      const imageFieldRegex = new RegExp(
        `(id:\\s*["']${product.id}["'][^}]*image:\\s*["'])([^"']*)`,
        "s",
      );

      const match = updatedContent.match(imageFieldRegex);
      if (match) {
        updatedContent = updatedContent.replace(
          imageFieldRegex,
          `$1${imageUrl}`,
        );
        successCount++;
        console.log(`✅ Updated image for ${product.name}`);
      } else {
        console.log(`⚠️  Could not find image field for ${product.name}`);
        failCount++;
      }
    } else {
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
