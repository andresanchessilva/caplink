const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function updatePasswords() {
  try {
    // Atualizar senhas dos usuários existentes
    await prisma.user.updateMany({
      where: { email: 'admin@exemplo.com' },
      data: {
        password: await bcrypt.hash('admin123', 12),
      },
    });

    await prisma.user.updateMany({
      where: { email: 'seller@exemplo.com' },
      data: {
        password: await bcrypt.hash('seller123', 12),
      },
    });

    await prisma.user.updateMany({
      where: { email: 'customer@exemplo.com' },
      data: {
        password: await bcrypt.hash('customer123', 12),
      },
    });

    console.log('Senhas atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords();
