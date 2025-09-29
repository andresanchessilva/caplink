const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetUsers() {
  try {
    // Deletar todos os usuários
    await prisma.user.deleteMany();
    console.log('Usuários deletados');

    // Recriar usuários com senhas hasheadas
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@exemplo.com',
        password: await bcrypt.hash('admin123', 12),
        role: 'ADMIN',
      },
    });

    const seller = await prisma.user.create({
      data: {
        name: 'Vendedor',
        email: 'seller@exemplo.com',
        password: await bcrypt.hash('seller123', 12),
        role: 'SELLER',
      },
    });

    const customer = await prisma.user.create({
      data: {
        name: 'Cliente',
        email: 'customer@exemplo.com',
        password: await bcrypt.hash('customer123', 12),
        role: 'CUSTOMER',
      },
    });

    console.log('Usuários criados:', {
      admin: admin.id,
      seller: seller.id,
      customer: customer.id,
    });
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUsers();
