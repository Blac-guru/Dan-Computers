const fs = require("fs");
const path = require("path");

const content = `export interface Product {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  price?: string;
  specs?: string;
  rating?: number;
  image?: string;
  images?: string[];
  description?: string;
  longDescription?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  warranty?: string;
  availability?: string;
  inStock?: boolean;
  stockQuantity?: number;
}

// Canonical owner product list — exact prices preserved
export const productsData: Product[] = [
  {
    id: "dell-latitude-7410-ssd",
    name: "Dell Latitude 7410 SSD",
    brand: "Dell",
    category: "laptops",
    price: "52,474 KES",
    specs: "Refurbished; Intel Core i5/i7; 8-16GB RAM; 256-512GB SSD",
    inStock: true,
    stockQuantity: 7,
  },
  {
    id: "dell-latitude-13-3-i7-8650u",
    name: "Dell Latitude 13.3\" Core i7-8650U",
    brand: "Dell",
    category: "laptops",
    price: "15,728 KES",
    specs: "Refurbished; Core i7-8650U; 8GB RAM; 256GB SSD",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: "hp-all-in-one-core-i5-7th-gen",
    name: "HP All-in-One PC – Core i5 (7th Gen)",
    brand: "HP",
    category: "desktops",
    price: "KSh 41,000",
    specs: "Intel Core i5 (7th Generation); 8GB RAM; 256GB SSD",
    inStock: true,
    stockQuantity: 5,
  },
  {
    id: "hp-all-in-one-core-i5-6th-gen",
    name: "HP All-in-One PC – Core i5 (6th Gen)",
    brand: "HP",
    category: "desktops",
    price: "KSh 32,000",
    specs: "Intel Core i5 (6th Generation); 8GB RAM; 500GB HDD",
    inStock: true,
    stockQuantity: 6,
  },
  {
    id: "hp-desktop-core-i5-4gb-500gb",
    name: "HP Desktop PC – Core i5",
    brand: "HP",
    category: "desktops",
    price: "KSh 7,500",
    specs: "4GB RAM; 500GB HDD",
    inStock: true,
    stockQuantity: 12,
  },
  {
    id: "hp-elitebook-830-g6-8gb-256ssd",
    name: "HP EliteBook 830 G6",
    brand: "HP",
    category: "laptops",
    price: "KSh 26,500",
    specs: "Intel Core i5 (8th Gen); 8GB RAM; 256GB SSD",
    inStock: true,
    stockQuantity: 6,
  },
  {
    id: "hp-elitebook-830-g6-16gb-touch",
    name: "HP EliteBook 830 G6 (16GB, Touch)",
    brand: "HP",
    category: "laptops",
    price: "KSh 28,500",
    specs: "Intel Core i5 (8th Gen); 16GB RAM; 256GB SSD; Touchscreen",
    inStock: true,
    stockQuantity: 3,
  },
  {
    id: "hp-elitebook-840-g7-i7-16gb-512ssd",
    name: "HP EliteBook 840 G7 – Core i7",
    brand: "HP",
    category: "laptops",
    price: "KSh 39,000",
    specs: "Intel Core i7 (10th Gen); 16GB RAM; 512GB SSD",
    inStock: true,
    stockQuantity: 2,
  },
  {
    id: "hp-elitebook-745-g6-14-ryzen3",
    name: "HP EliteBook 745 G6 (14)",
    brand: "HP",
    category: "laptops",
    price: "KSh 26,000",
    specs: "AMD Ryzen 3 Pro; 14\" screen; 8GB RAM; 256GB SSD",
    inStock: true,
    stockQuantity: 4,
  },
  {
    id: "wireless-mouse-550",
    name: "Wireless Mouse",
    category: "accessories",
    price: "KSh 550",
    inStock: true,
    stockQuantity: 120,
  },
  {
    id: "ssd-256-2-5",
    name: "256GB SSD 2.5\"",
    category: "storage",
    price: "KSh 2,500",
    inStock: true,
    stockQuantity: 50,
  },
];
`;

const out = path.join(process.cwd(), "lib", "products.ts");
fs.writeFileSync(out, content, "utf8");
console.log("Wrote", out);
