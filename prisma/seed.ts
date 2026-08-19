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

interface SubcategorySeedItem {
  category: ProductCategory;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
}

const SUBCATEGORIES_SEED: SubcategorySeedItem[] = [
  // ──────────────────────────────────────────────
  // 1. CAKES
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.CAKES,
    name: "Celebration Cakes",
    slug: "celebration-cakes",
    description: "Custom birthday, wedding, anniversary, and bespoke milestone cakes.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.CAKES,
    name: "Everyday Cakes",
    slug: "everyday-cakes",
    description: "Casual teatime sponge cakes, pound cakes, and daily slice bakes.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.CAKES,
    name: "Cupcakes",
    slug: "cupcakes",
    description: "Individually frosted, decorated gourmet cupcakes and mini cupcake boxes.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.CAKES,
    name: "Cheesecakes",
    slug: "cheesecakes",
    description: "Baked New York, Basque burnt, and cold-set artisanal fruit cheesecakes.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.CAKES,
    name: "Loaf Cakes",
    slug: "loaf-cakes",
    description: "Banana breads, lemon drizzle, marble loaves, and dense tea bakes.",
    sortOrder: 5,
  },
  {
    category: ProductCategory.CAKES,
    name: "Roll Cakes",
    slug: "roll-cakes",
    description: "Swiss rolls, Japanese roulades, and cream-filled sponge logs.",
    sortOrder: 6,
  },
  {
    category: ProductCategory.CAKES,
    name: "Mini Cakes",
    slug: "mini-cakes",
    description: "Bento cakes, mini layered gateaux, and single-serve celebration cakes.",
    sortOrder: 7,
  },

  // ──────────────────────────────────────────────
  // 2. COOKIES_AND_BISCUITS
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.COOKIES_AND_BISCUITS,
    name: "Cookies",
    slug: "cookies",
    description: "Chunky chocolate chip, NYC style, chewy oatmeal, and stuffed cookies.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.COOKIES_AND_BISCUITS,
    name: "Biscuits",
    slug: "biscuits",
    description: "Shortbreads, tea biscuits, nankhatai, and crispy butter biscuits.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.COOKIES_AND_BISCUITS,
    name: "Macarons",
    slug: "macarons",
    description: "French almond meringue shells filled with rich ganache, curd, or buttercream.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.COOKIES_AND_BISCUITS,
    name: "Sandwich Cookies",
    slug: "sandwich-cookies",
    description: "Double-layered biscuit cookies with cream, caramel, or fruit jam fillings.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.COOKIES_AND_BISCUITS,
    name: "Crackers",
    slug: "crackers",
    description: "Artisanal savory crisps, seed crackers, and cheese wafers.",
    sortOrder: 5,
  },

  // ──────────────────────────────────────────────
  // 3. BREADS
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.BREADS,
    name: "Loaves",
    slug: "loaves",
    description: "Country sourdough, sandwich bread, brioche, and whole wheat tin loaves.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.BREADS,
    name: "Buns",
    slug: "buns",
    description: "Soft burger buns, slider buns, pav, and dinner rolls.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.BREADS,
    name: "Rolls",
    slug: "rolls",
    description: "Crusty artisan rolls, pretzel rolls, and knotted morning bread rolls.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.BREADS,
    name: "Bagels",
    slug: "bagels",
    description: "Boiled and baked chewy bagels with sesame, everything seasoning, and plain.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.BREADS,
    name: "Baguettes",
    slug: "baguettes",
    description: "Traditional French long crusty loaves with open airy crumb structure.",
    sortOrder: 5,
  },
  {
    category: ProductCategory.BREADS,
    name: "Flatbreads",
    slug: "flatbreads",
    description: "Focaccia, pita, lavash, naan, and herb-oil flatbreads.",
    sortOrder: 6,
  },
  {
    category: ProductCategory.BREADS,
    name: "Specialty Breads",
    slug: "specialty-breads",
    description: "Gluten-free loaves, seed-heavy rye, challah, and seasonal festive breads.",
    sortOrder: 7,
  },

  // ──────────────────────────────────────────────
  // 4. PASTRIES
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.PASTRIES,
    name: "Croissants & Laminated Pastries",
    slug: "croissants-and-laminated-pastries",
    description: "Classic French butter croissants, pain au chocolat, and kouign-amann.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.PASTRIES,
    name: "Danish Pastries",
    slug: "danish-pastries",
    description: "Flaky laminated pastry with fruit custard, cream cheese, or pecan fillings.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.PASTRIES,
    name: "Choux Pastries",
    slug: "choux-pastries",
    description: "Eclairs, profiteroles, Paris-Brest, and choux au craquelin.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.PASTRIES,
    name: "Cream Pastries",
    slug: "cream-pastries",
    description: "Mille-feuille, napoleons, and layered puff cream horns.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.PASTRIES,
    name: "Filled Pastries",
    slug: "filled-pastries",
    description: "Fruit turnovers, strudels, and sweet hand pies.",
    sortOrder: 5,
  },
  {
    category: ProductCategory.PASTRIES,
    name: "Sweet Rolls",
    slug: "sweet-rolls",
    description: "Cinnamon rolls, cardamom knots, babka slices, and sticky morning buns.",
    sortOrder: 6,
  },

  // ──────────────────────────────────────────────
  // 5. PIES_TARTS_AND_QUICHES
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.PIES_TARTS_AND_QUICHES,
    name: "Fruit Pies",
    slug: "fruit-pies",
    description: "Apple, cherry, berry, and seasonal spiced fruit lattice pies.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.PIES_TARTS_AND_QUICHES,
    name: "Cream & Custard Pies",
    slug: "cream-and-custard-pies",
    description: "Banoffee pie, chocolate silk, pumpkin pie, and key lime pies.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.PIES_TARTS_AND_QUICHES,
    name: "Sweet Tarts",
    slug: "sweet-tarts",
    description: "Lemon meringue tarts, dark chocolate ganache, and fresh fruit tartlets.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.PIES_TARTS_AND_QUICHES,
    name: "Savory Tarts",
    slug: "savory-tarts",
    description: "Caramelized onion, goat cheese, mushroom, and heirloom tomato tarts.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.PIES_TARTS_AND_QUICHES,
    name: "Quiches",
    slug: "quiches",
    description: "Quiche Lorraine, spinach & feta, mushroom leek, and crustless quiches.",
    sortOrder: 5,
  },

  // ──────────────────────────────────────────────
  // 6. BROWNIES_AND_BARS
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.BROWNIES_AND_BARS,
    name: "Brownies",
    slug: "brownies",
    description: "Fudgy Belgian chocolate brownies, walnut, cheesecake swirl, and salted caramel.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.BROWNIES_AND_BARS,
    name: "Blondies",
    slug: "blondies",
    description: "Brown butter vanilla blondies, white chocolate raspberry, and biscoff bars.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.BROWNIES_AND_BARS,
    name: "Dessert Bars",
    slug: "dessert-bars",
    description: "Lemon bars, Millionaire's shortbread, pecan squares, and crumble bars.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.BROWNIES_AND_BARS,
    name: "Granola & Snack Bars",
    slug: "granola-and-snack-bars",
    description: "Oat energy bars, honey nut flapjacks, and seed snack squares.",
    sortOrder: 4,
  },

  // ──────────────────────────────────────────────
  // 7. DONUTS_AND_FRITTERS
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.DONUTS_AND_FRITTERS,
    name: "Yeast Donuts",
    slug: "yeast-donuts",
    description: "Light, airy glazed ring donuts, chocolate frosted, and sprinkle donuts.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.DONUTS_AND_FRITTERS,
    name: "Cake Donuts",
    slug: "cake-donuts",
    description: "Dense, spiced old-fashioned donuts, cider donuts, and sour cream rings.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.DONUTS_AND_FRITTERS,
    name: "Filled Donuts",
    slug: "filled-donuts",
    description: "Boston cream, raspberry jelly, custard, and nutella filled donuts.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.DONUTS_AND_FRITTERS,
    name: "Bomboloni",
    slug: "bomboloni",
    description: "Italian sugar-rolled fried dough balls stuffed with pastry cream or pistachio.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.DONUTS_AND_FRITTERS,
    name: "Fritters",
    slug: "fritters",
    description: "Apple cinnamon fritters, banana fritters, and beignets.",
    sortOrder: 5,
  },

  // ──────────────────────────────────────────────
  // 8. DESSERTS
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.DESSERTS,
    name: "Mousse",
    slug: "mousse",
    description: "Silky dark chocolate mousse, mango passionfruit, and white chocolate pots.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.DESSERTS,
    name: "Puddings & Custards",
    slug: "puddings-and-custards",
    description: "Crème brûlée, bread & butter pudding, flan, and caramel custards.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.DESSERTS,
    name: "Tiramisu & Trifles",
    slug: "tiramisu-and-trifles",
    description: "Classic espresso mascarpone tiramisu and layered English berry trifles.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.DESSERTS,
    name: "Panna Cotta & Cream Desserts",
    slug: "panna-cotta-and-cream-desserts",
    description: "Vanilla bean panna cotta, fruit coulis cups, and possets.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.DESSERTS,
    name: "Dessert Cups & Jars",
    slug: "dessert-cups-and-jars",
    description: "Layered cake jars, cheesecake parfaits, and portable dessert shooters.",
    sortOrder: 5,
  },
  {
    category: ProductCategory.DESSERTS,
    name: "Other Desserts",
    slug: "other-desserts",
    description: "Pavlovas, meringues, molten lava cakes, and seasonal creations.",
    sortOrder: 6,
  },

  // ──────────────────────────────────────────────
  // 9. SAVORY_BAKES
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.SAVORY_BAKES,
    name: "Puffs",
    slug: "puffs",
    description: "Flaky veg puffs, paneer tikka puffs, chicken curry puffs, and egg puffs.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.SAVORY_BAKES,
    name: "Patties",
    slug: "patties",
    description: "Crisp potato patties, spiced corn cheese patties, and meat patties.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.SAVORY_BAKES,
    name: "Stuffed Bakes",
    slug: "stuffed-bakes",
    description: "Calzones, savory bread rolls, stuffed garlic bread, and savory buns.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.SAVORY_BAKES,
    name: "Savory Pastries",
    slug: "savory-pastries",
    description: "Cheese straws, gougères, vol-au-vents, and sausage rolls.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.SAVORY_BAKES,
    name: "Pizza & Savory Breads",
    slug: "pizza-and-savory-breads",
    description: "Focaccia pizza slabs, olive herb pull-aparts, and cheese swirl breads.",
    sortOrder: 5,
  },

  // ──────────────────────────────────────────────
  // 10. CONFECTIONERY
  // ──────────────────────────────────────────────
  {
    category: ProductCategory.CONFECTIONERY,
    name: "Chocolates",
    slug: "chocolates",
    description: "Handmade bean-to-bar chocolate bars, bonbons, and chocolate barks.",
    sortOrder: 1,
  },
  {
    category: ProductCategory.CONFECTIONERY,
    name: "Truffles",
    slug: "truffles",
    description: "Cocoa-dusted ganache truffles, hazelnut pralines, and liqueur truffles.",
    sortOrder: 2,
  },
  {
    category: ProductCategory.CONFECTIONERY,
    name: "Fudge",
    slug: "fudge",
    description: "Rich chocolate fudge, vanilla walnut fudge, and peanut butter squares.",
    sortOrder: 3,
  },
  {
    category: ProductCategory.CONFECTIONERY,
    name: "Caramels & Toffees",
    slug: "caramels-and-toffees",
    description: "Salted butter soft caramels, English toffee brittle, and butterscotch chews.",
    sortOrder: 4,
  },
  {
    category: ProductCategory.CONFECTIONERY,
    name: "Other Confectionery",
    slug: "other-confectionery",
    description: "Artisanal marshmallows, Turkish delight, fruit pâte de fruits, and pralines.",
    sortOrder: 5,
  },
];

async function main() {
  console.log(`🌱 Starting subcategory seeding (${SUBCATEGORIES_SEED.length} items)...`);

  let createdCount = 0;
  let updatedCount = 0;

  for (const item of SUBCATEGORIES_SEED) {
    const result = await prisma.subcategory.upsert({
      where: {
        category_slug: {
          category: item.category,
          slug: item.slug,
        },
      },
      update: {
        name: item.name,
        description: item.description,
        sortOrder: item.sortOrder,
        isActive: true,
      },
      create: {
        category: item.category,
        name: item.name,
        slug: item.slug,
        description: item.description,
        sortOrder: item.sortOrder,
        isActive: true,
      },
    });

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      createdCount++;
    } else {
      updatedCount++;
    }
  }

  console.log(
    `✅ Subcategory seed completed successfully!\n` +
      `   - Total items processed: ${SUBCATEGORIES_SEED.length}\n` +
      `   - New created: ${createdCount}\n` +
      `   - Updated/Verified: ${updatedCount}\n` +
      `   - Categories covered: 10/10\n`
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
