import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/customerSession";
import AddressForm from "./AddressForm";
import DeleteAddressButton from "./DeleteAddressButton";
import { createAddressAction, deleteAddressAction, setDefaultAddressAction } from "./actions";

export default async function AddressesPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/account/login?from=/account/addresses");

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <h1 className="font-display text-3xl text-charcoal">Your addresses</h1>

      <div className="mt-8 space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="rounded-2xl border border-charcoal/10 p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="flex items-center gap-2 font-medium text-charcoal">
                  {address.label}
                  {address.isDefault && (
                    <span className="rounded-full bg-maroon px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ivory">
                      Default
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-charcoal-soft">
                  {address.fullName} · {address.phone}
                  <br />
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                  <br />
                  {address.city}, {address.state} {address.pincode}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                <Link
                  href={`/account/addresses/${address.id}/edit`}
                  className="text-sm font-medium text-maroon hover:underline"
                >
                  Edit
                </Link>
                {!address.isDefault && (
                  <form action={setDefaultAddressAction.bind(null, address.id)}>
                    <button type="submit" className="text-sm text-charcoal-soft hover:text-maroon">
                      Set default
                    </button>
                  </form>
                )}
                <form action={deleteAddressAction.bind(null, address.id)}>
                  <DeleteAddressButton />
                </form>
              </div>
            </div>
          </div>
        ))}
        {addresses.length === 0 && (
          <p className="text-sm text-charcoal-soft">No saved addresses yet.</p>
        )}
      </div>

      <div className="mt-10 rounded-2xl border border-charcoal/10 p-6">
        <h2 className="font-display text-xl text-charcoal">Add a new address</h2>
        <div className="mt-4">
          <AddressForm action={createAddressAction} submitLabel="Save address" />
        </div>
      </div>
    </div>
  );
}
