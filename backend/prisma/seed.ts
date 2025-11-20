import { PrismaClient, Role } from '../generated/prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const corn = await prisma.product.upsert({
    where: { sku: 'CORN-001' },
    update: {},
    create: {
      sku: 'CORN-001',
      name: 'Corn',
      stock: 2,
      price: 2.5,
    },
  });
  console.log('Created product:', corn);

  const adminPassword = await argon2.hash('3265plok');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin User',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log('Created admin user:', { ...admin, password: '******' });

  const userPassword = await argon2.hash('3265plok');
  const user = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      email: 'user1@gmail.com',
      name: 'User1',
      password: userPassword,
      role: Role.USER,
    },
  });
  console.log('Created regular user:', { ...user, password: '******' });
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
