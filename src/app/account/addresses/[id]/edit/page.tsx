import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/customerSession";
import AddressForm from "../../AddressForm";
import { updateAddressAction } from "../../actions";

export default async function EditAddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login");

  const { id } = await params;
  const address = await prisma.address.findFirst({ where: { id, userId } });
  if (!address) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Edit address</h1>
      <div className="mt-8">
        <AddressForm
          address={address}
          action={updateAddressAction.bind(null, id)}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
