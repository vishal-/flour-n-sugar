import fs from "fs";
import path from "path";
import { PrismaClient, ProductCategory } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface SubcategoryData {
  id: string;
  category: ProductCategory;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
}

interface CatalogProductData {
  category: ProductCategory;
  subcategoryId?: string | null;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  suggestedPrice?: number;
  isEggless: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  sortOrder: number;
}

async function main() {
  console.log("🌱 Starting database seeding with hardcoded UUID relations...\n");

  // ─────────────────────────────────────────────────────────────
  // 1. Seed Subcategories from prisma/data/subcategories.json
  // ─────────────────────────────────────────────────────────────
  const subcategoriesPath = path.join(process.cwd(), "prisma", "data", "subcategories.json");
  const subcategoriesRaw = fs.readFileSync(subcategoriesPath, "utf-8");
  const subcategories: SubcategoryData[] = JSON.parse(subcategoriesRaw);

  console.log(`📁 Loaded ${subcategories.length} subcategories from subcategories.json`);

  let subcategoryCreated = 0;
  let subcategoryUpdated = 0;

  for (const item of subcategories) {
    const result = await prisma.subcategory.upsert({
      where: {
        id: item.id,
      },
      update: {
        category: item.category,
        name: item.name,
        slug: item.slug,
        description: item.description,
        sortOrder: item.sortOrder,
        isActive: true,
      },
      create: {
        id: item.id,
        category: item.category,
        name: item.name,
        slug: item.slug,
        description: item.description,
        sortOrder: item.sortOrder,
        isActive: true,
      },
    });

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      subcategoryCreated++;
    } else {
      subcategoryUpdated++;
    }
  }

  console.log(
    `✅ Subcategories seeded:\n` +
      `   - Total processed: ${subcategories.length}\n` +
      `   - Created: ${subcategoryCreated}\n` +
      `   - Updated: ${subcategoryUpdated}\n`
  );

  // ─────────────────────────────────────────────────────────────
  // 2. Seed Catalog Products from prisma/data/catalog-products.json
  // ─────────────────────────────────────────────────────────────
  const catalogProductsPath = path.join(process.cwd(), "prisma", "data", "catalog-products.json");
  const catalogProductsRaw = fs.readFileSync(catalogProductsPath, "utf-8");
  const catalogProducts: CatalogProductData[] = JSON.parse(catalogProductsRaw);

  console.log(`📁 Loaded ${catalogProducts.length} catalog products from catalog-products.json`);

  let catalogCreated = 0;
  let catalogUpdated = 0;

  for (const item of catalogProducts) {
    const result = await prisma.catalogProduct.upsert({
      where: { slug: item.slug },
      update: {
        category: item.category,
        subcategoryId: item.subcategoryId || null,
        name: item.name,
        description: item.description,
        image: item.image || null,
        suggestedPrice: item.suggestedPrice !== undefined ? item.suggestedPrice : null,
        isEggless: item.isEggless,
        isVegan: item.isVegan,
        isGlutenFree: item.isGlutenFree,
        sortOrder: item.sortOrder,
        isActive: true,
      },
      create: {
        category: item.category,
        subcategoryId: item.subcategoryId || null,
        name: item.name,
        slug: item.slug,
        description: item.description,
        image: item.image || null,
        suggestedPrice: item.suggestedPrice !== undefined ? item.suggestedPrice : null,
        isEggless: item.isEggless,
        isVegan: item.isVegan,
        isGlutenFree: item.isGlutenFree,
        sortOrder: item.sortOrder,
        isActive: true,
      },
    });

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      catalogCreated++;
    } else {
      catalogUpdated++;
    }
  }

  console.log(
    `✅ Catalog Products seeded:\n` +
      `   - Total processed: ${catalogProducts.length}\n` +
      `   - Created: ${catalogCreated}\n` +
      `   - Updated: ${catalogUpdated}\n`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
