import { prisma } from "@/lib/db";

const includeProduct = {
  product: { include: { category: true } },
} as const;

export async function getCartItems(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: includeProduct,
    orderBy: { createdAt: "desc" },
  });
}

export async function getSavedItems(userId: string) {
  return prisma.savedItem.findMany({
    where: { userId },
    include: includeProduct,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCartCount(userId: string | null): Promise<number> {
  if (!userId) return 0;
  const result = await prisma.cartItem.aggregate({
    where: { userId },
    _sum: { quantity: true },
  });
  return result._sum.quantity ?? 0;
}

export function cartSubtotal(items: { quantity: number; product: { price: number | null } }[]): number {
  return items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id: productId } });
  if (product.price == null) {
    throw new Error("This product doesn't have a price set yet, so it can't be added to cart.");
  }

  await prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId } },
    update: { quantity: { increment: quantity } },
    create: { userId, productId, quantity },
  });
}

export async function updateCartQuantity(userId: string, cartItemId: string, quantity: number) {
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { id: cartItemId, userId } });
    return;
  }
  await prisma.cartItem.updateMany({ where: { id: cartItemId, userId }, data: { quantity } });
}

export async function removeFromCart(userId: string, cartItemId: string) {
  await prisma.cartItem.deleteMany({ where: { id: cartItemId, userId } });
}

export async function moveCartItemToSaved(userId: string, cartItemId: string) {
  const item = await prisma.cartItem.findFirst({ where: { id: cartItemId, userId } });
  if (!item) return;

  await prisma.$transaction([
    prisma.savedItem.upsert({
      where: { userId_productId: { userId, productId: item.productId } },
      update: {},
      create: { userId, productId: item.productId },
    }),
    prisma.cartItem.delete({ where: { id: item.id } }),
  ]);
}

export async function moveSavedItemToCart(userId: string, savedItemId: string) {
  const item = await prisma.savedItem.findFirst({ where: { id: savedItemId, userId } });
  if (!item) return;

  const product = await prisma.product.findUnique({ where: { id: item.productId } });
  if (!product || product.price == null) return;

  await prisma.$transaction([
    prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: item.productId } },
      update: { quantity: { increment: 1 } },
      create: { userId, productId: item.productId, quantity: 1 },
    }),
    prisma.savedItem.delete({ where: { id: item.id } }),
  ]);
}

export async function removeSavedItem(userId: string, savedItemId: string) {
  await prisma.savedItem.deleteMany({ where: { id: savedItemId, userId } });
}

export async function clearCart(userId: string) {
  await prisma.cartItem.deleteMany({ where: { userId } });
}
