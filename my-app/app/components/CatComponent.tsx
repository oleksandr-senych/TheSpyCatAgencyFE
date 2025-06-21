"use client";

import EditButton from "./EditButton";

import { Cat } from "../lib/api";
import DeleteButton from "./DeleteButton";

export default function CatComponent({
  cat,
  onUpdate,
}: {
  cat: Cat;
  onUpdate: () => void;
}) {
  return (
    <div className="border p-3 my-3 rounded flex justify-between items-center">
      <div>
        <p className="font-semibold text-lg">{cat.name}</p>
        <p className="text-sm text-gray-600">
          Breed: {cat.breed} | Experience: {cat.experience} years |
          Salary: ${cat.salary}
        </p>
      </div>
      <div className="flex space-x-2">
        <EditButton catId={cat.id} onUpdate={onUpdate} />
        <DeleteButton catId={cat.id} onDelete={onUpdate} />
      </div>
    </div>
  );
}
