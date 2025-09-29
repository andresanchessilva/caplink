const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// Função para verificar se uma string é um UUID válido
function isValidUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

async function fixAllIds() {
  try {
    console.log('🔍 Verificando todas as entidades com IDs inválidos...\n');

    // Verificar Users
    console.log('👥 Verificando usuários...');
    const users = await prisma.user.findMany();
    const invalidUsers = users.filter((user) => !isValidUUID(user.id));
    console.log(`   Total: ${users.length}, Inválidos: ${invalidUsers.length}`);

    if (invalidUsers.length > 0) {
      for (const user of invalidUsers) {
        const oldId = user.id;
        const newId = uuidv4();
        console.log(`   🔄 ${user.name}: ${oldId} → ${newId}`);
        await prisma.user.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar Products
    console.log('\n📦 Verificando produtos...');
    const products = await prisma.product.findMany();
    const invalidProducts = products.filter(
      (product) => !isValidUUID(product.id),
    );
    console.log(
      `   Total: ${products.length}, Inválidos: ${invalidProducts.length}`,
    );

    if (invalidProducts.length > 0) {
      for (const product of invalidProducts) {
        const oldId = product.id;
        const newId = uuidv4();
        console.log(`   🔄 ${product.name}: ${oldId} → ${newId}`);
        await prisma.product.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar Favorites
    console.log('\n❤️ Verificando favoritos...');
    const favorites = await prisma.favorite.findMany();
    const invalidFavorites = favorites.filter(
      (favorite) => !isValidUUID(favorite.id),
    );
    console.log(
      `   Total: ${favorites.length}, Inválidos: ${invalidFavorites.length}`,
    );

    if (invalidFavorites.length > 0) {
      for (const favorite of invalidFavorites) {
        const oldId = favorite.id;
        const newId = uuidv4();
        console.log(`   🔄 Favorito: ${oldId} → ${newId}`);
        await prisma.favorite.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar Carts
    console.log('\n🛒 Verificando carrinhos...');
    const carts = await prisma.cart.findMany();
    const invalidCarts = carts.filter((cart) => !isValidUUID(cart.id));
    console.log(`   Total: ${carts.length}, Inválidos: ${invalidCarts.length}`);

    if (invalidCarts.length > 0) {
      for (const cart of invalidCarts) {
        const oldId = cart.id;
        const newId = uuidv4();
        console.log(`   🔄 Carrinho: ${oldId} → ${newId}`);
        await prisma.cart.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar CartItems
    console.log('\n🛍️ Verificando itens do carrinho...');
    const cartItems = await prisma.cartItem.findMany();
    const invalidCartItems = cartItems.filter((item) => !isValidUUID(item.id));
    console.log(
      `   Total: ${cartItems.length}, Inválidos: ${invalidCartItems.length}`,
    );

    if (invalidCartItems.length > 0) {
      for (const item of invalidCartItems) {
        const oldId = item.id;
        const newId = uuidv4();
        console.log(`   🔄 Item do carrinho: ${oldId} → ${newId}`);
        await prisma.cartItem.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar Orders
    console.log('\n📋 Verificando pedidos...');
    const orders = await prisma.order.findMany();
    const invalidOrders = orders.filter((order) => !isValidUUID(order.id));
    console.log(
      `   Total: ${orders.length}, Inválidos: ${invalidOrders.length}`,
    );

    if (invalidOrders.length > 0) {
      for (const order of invalidOrders) {
        const oldId = order.id;
        const newId = uuidv4();
        console.log(`   🔄 Pedido: ${oldId} → ${newId}`);
        await prisma.order.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    // Verificar OrderItems
    console.log('\n📝 Verificando itens dos pedidos...');
    const orderItems = await prisma.orderItem.findMany();
    const invalidOrderItems = orderItems.filter(
      (item) => !isValidUUID(item.id),
    );
    console.log(
      `   Total: ${orderItems.length}, Inválidos: ${invalidOrderItems.length}`,
    );

    if (invalidOrderItems.length > 0) {
      for (const item of invalidOrderItems) {
        const oldId = item.id;
        const newId = uuidv4();
        console.log(`   🔄 Item do pedido: ${oldId} → ${newId}`);
        await prisma.orderItem.update({
          where: { id: oldId },
          data: { id: newId },
        });
      }
    }

    console.log('\n🎉 Verificação e correção concluídas!');
  } catch (error) {
    console.error('❌ Erro ao verificar/corrigir IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
fixAllIds();
