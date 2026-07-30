"use client";

export default function DeleteAddressButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this address?")) e.preventDefault();
      }}
      className="text-sm font-medium text-red-700 hover:underline"
    >
      Delete
    </button>
  );
}
