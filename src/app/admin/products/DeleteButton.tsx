"use client";

export default function DeleteButton({ productName }: { productName: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`Delete "${productName}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
      className="text-sm font-medium text-red-700 hover:underline"
    >
      Delete
    </button>
  );
}
