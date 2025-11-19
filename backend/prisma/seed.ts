import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const corn = await prisma.product.upsert({
    where: { sku: 'CORN-001' },
    update: {},
    create: {
      sku: 'CORN-001',
      name: 'Corn',
      stock: 2,
    },
  });

  console.log('Created product:', corn);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
