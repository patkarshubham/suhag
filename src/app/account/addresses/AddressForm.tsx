import type { Address } from "@/generated/prisma/client";

export default function AddressForm({
  address,
  action,
  submitLabel,
}: {
  address?: Address;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Label
          <select
            name="label"
            defaultValue={address?.label ?? "Home"}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          >
            <option>Home</option>
            <option>Work</option>
            <option>Other</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Phone
          <input
            name="phone"
            required
            defaultValue={address?.phone}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Full name
        <input
          name="fullName"
          required
          defaultValue={address?.fullName}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Address line 1
        <input
          name="line1"
          required
          defaultValue={address?.line1}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
        Address line 2 (optional)
        <input
          name="line2"
          defaultValue={address?.line2 ?? ""}
          className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
        />
      </label>

      <div className="grid grid-cols-3 gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          City
          <input
            name="city"
            required
            defaultValue={address?.city}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          State
          <input
            name="state"
            required
            defaultValue={address?.state}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-charcoal">
          Pincode
          <input
            name="pincode"
            required
            defaultValue={address?.pincode}
            className="rounded-lg border border-charcoal/15 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-maroon"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-charcoal">
        <input
          type="checkbox"
          name="isDefault"
          defaultChecked={address?.isDefault}
          className="size-4 rounded border-charcoal/30 accent-maroon"
        />
        Set as default address
      </label>

      <button
        type="submit"
        className="rounded-full bg-maroon px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-maroon-deep"
      >
        {submitLabel}
      </button>
    </form>
  );
}
