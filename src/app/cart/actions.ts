"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/customerSession";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  moveCartItemToSaved,
  moveSavedItemToCart,
  removeSavedItem,
} from "@/lib/cart";

export async function addToCartAction(formData: FormData) {
  const userId = await getCurrentUserId();
  const productId = String(formData.get("productId") ?? "");
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));

  if (!userId) {
    redirect(`/account/login?from=${encodeURIComponent(String(formData.get("from") ?? "/cart"))}`);
  }

  await addToCart(userId, productId, quantity);
  revalidatePath("/cart");
  redirect("/cart");
}

export async function updateQuantityAction(cartItemId: string, formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  const quantity = Number(formData.get("quantity") ?? 1);
  await updateCartQuantity(userId, cartItemId, quantity);
  revalidatePath("/cart");
}

export async function removeFromCartAction(cartItemId: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await removeFromCart(userId, cartItemId);
  revalidatePath("/cart");
}

export async function moveToSavedAction(cartItemId: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await moveCartItemToSaved(userId, cartItemId);
  revalidatePath("/cart");
  revalidatePath("/saved");
}

export async function moveToCartAction(savedItemId: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await moveSavedItemToCart(userId, savedItemId);
  revalidatePath("/cart");
  revalidatePath("/saved");
}

export async function removeSavedAction(savedItemId: string, _formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  await removeSavedItem(userId, savedItemId);
  revalidatePath("/saved");
}
