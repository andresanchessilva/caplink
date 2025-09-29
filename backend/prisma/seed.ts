import { PrismaClient, Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@exemplo.com',
      password: 'admin123',
      role: Role.ADMIN,
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@exemplo.com' },
    update: {},
    create: {
      name: 'Vendedor',
      email: 'seller@exemplo.com',
      password: await bcrypt.hash('seller123', 12),
      role: Role.SELLER,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@exemplo.com' },
    update: {},
    create: {
      name: 'Cliente',
      email: 'customer@exemplo.com',
      password: await bcrypt.hash('customer123', 12),
      role: Role.CUSTOMER,
    },
  });

  // Seed products (for seller)
  const product1Id = uuidv4();
  const product2Id = uuidv4();
  const product1 = await prisma.product.upsert({
    where: { id: product1Id },
    update: {},
    create: {
      id: product1Id,
      name: 'Camiseta Algodão',
      price: 49.99,
      description: 'Camiseta confortável de algodão',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: product2Id },
    update: {},
    create: {
      id: product2Id,
      name: 'Calça Jeans',
      price: 99.9,
      description: 'Calça jeans azul escuro',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  // Adicionar mais produtos
  const product3Id = uuidv4();
  const product3 = await prisma.product.upsert({
    where: { id: product3Id },
    update: {},
    create: {
      id: product3Id,
      name: 'Tênis Esportivo',
      price: 199.99,
      description: 'Tênis confortável para corrida e caminhada',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product4Id = uuidv4();
  const product4 = await prisma.product.upsert({
    where: { id: product4Id },
    update: {},
    create: {
      id: product4Id,
      name: 'Moletom com Capuz',
      price: 129.99,
      description: 'Moletom quentinho e confortável',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  const product5Id = uuidv4();
  const product5 = await prisma.product.upsert({
    where: { id: product5Id },
    update: {},
    create: {
      id: product5Id,
      name: 'Shorts de Academia',
      price: 59.99,
      description: 'Shorts confortável para treino',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product6Id = uuidv4();
  const product6 = await prisma.product.upsert({
    where: { id: product6Id },
    update: {},
    create: {
      id: product6Id,
      name: 'Jaqueta de Couro',
      price: 299.99,
      description: 'Jaqueta de couro legítimo',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  const product7Id = uuidv4();
  const product7 = await prisma.product.upsert({
    where: { id: product7Id },
    update: {},
    create: {
      id: product7Id,
      name: 'Vestido Casual',
      price: 89.99,
      description: 'Vestido elegante para o dia a dia',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product8Id = uuidv4();
  const product8 = await prisma.product.upsert({
    where: { id: product8Id },
    update: {},
    create: {
      id: product8Id,
      name: 'Blusa de Tricô',
      price: 79.99,
      description: 'Blusa de tricô artesanal',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  const product9Id = uuidv4();
  const product9 = await prisma.product.upsert({
    where: { id: product9Id },
    update: {},
    create: {
      id: product9Id,
      name: 'Sapato Social',
      price: 249.99,
      description: 'Sapato social de couro para ocasiões especiais',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product10Id = uuidv4();
  const product10 = await prisma.product.upsert({
    where: { id: product10Id },
    update: {},
    create: {
      id: product10Id,
      name: 'Bolsa de Couro',
      price: 159.99,
      description: 'Bolsa de couro legítimo para o dia a dia',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  const product11Id = uuidv4();
  const product11 = await prisma.product.upsert({
    where: { id: product11Id },
    update: {},
    create: {
      id: product11Id,
      name: 'Óculos de Sol',
      price: 119.99,
      description: 'Óculos de sol com proteção UV',
      imageUrl: 'https://exemplo.com/camiseta.jpg',
      sellerId: seller.id,
    },
  });

  const product12Id = uuidv4();
  const product12 = await prisma.product.upsert({
    where: { id: product12Id },
    update: {},
    create: {
      id: product12Id,
      name: 'Relógio Digital',
      price: 89.99,
      description: 'Relógio digital com múltiplas funções',
      imageUrl: 'https://exemplo.com/calca.jpg',
      sellerId: seller.id,
    },
  });

  // Seed customer favorites
  await prisma.favorite.upsert({
    where: {
      customerId_productId: {
        customerId: customer.id,
        productId: product1.id,
      },
    },
    update: {},
    create: {
      customerId: customer.id,
      productId: product1.id,
    },
  });

  // Seed cart for customer
  const cart = await prisma.cart.upsert({
    where: { customerId: customer.id },
    update: {},
    create: {
      customerId: customer.id,
    },
  });

  // Seed cart items
  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: product2.id,
      },
    },
    update: {},
    create: {
      cartId: cart.id,
      productId: product2.id,
      quantity: 2,
    },
  });

  // Seed order for customer
  await prisma.order.create({
    data: {
      customerId: customer.id,
      total: 199.8,
      items: {
        create: [
          {
            productId: product2.id,
            quantity: 2,
            price: 99.9,
          },
        ],
      },
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
