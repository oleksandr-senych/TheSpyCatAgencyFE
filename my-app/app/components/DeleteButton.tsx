"use client";

import { deleteCat } from "../lib/api";

export default function DeleteButton({
  catId,
  onDelete,
}: {
  catId: number;
  onDelete: () => void;
}) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cat?"
    );
    if (!confirmed) return;

    try {
      await deleteCat(catId);
      onDelete(); // trigger refetch
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete cat.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm hover:cursor-pointer"
    >
      Delete
    </button>
  );
}
