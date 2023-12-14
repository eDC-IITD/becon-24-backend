const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function printUserData() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

printUserData();
