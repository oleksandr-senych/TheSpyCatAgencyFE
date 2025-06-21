"use client";

import { useState } from "react";
import { updateCatSalary } from "../lib/api";

export default function EditButton({
  catId,
  onUpdate,
}: {
  catId: number;
  onUpdate: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [newSalary, setNewSalary] = useState("");

  const handleSubmit = async () => {
    const salary = parseFloat(newSalary);
    if (isNaN(salary)) {
      alert("Please enter a valid number");
      return;
    }

    try {
      await updateCatSalary(catId, salary);
      setEditing(false);
      setNewSalary("");
      onUpdate();
    } catch (err) {
      console.error("Failed to update salary:", err);
      alert("Failed to update salary.");
    }
  };

  if (editing) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
          placeholder="New Salary"
          className="border px-2 py-1 rounded w-24 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="text-xs text-gray-500"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm cursor-pointer"
    >
      Edit
    </button>
  );
}
