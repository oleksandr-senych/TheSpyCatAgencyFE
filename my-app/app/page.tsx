"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { addCat, Cat, fetchCats } from "./lib/api";
import CatComponent from "./components/CatComponent";
export default function SpyCatsManagementPage() {
  const [Cats, setCats] = useState<Cat[]>([]);
  const [form, setForm] = useState({
    name: "",
    years_experience: "",
    breed: "",
    salary: "",
  });
  // const [form, setForm] = useState({ name: '', years_experience: 0, breed: '', salary: 0 })
  const loadCats = async () => {
    try {
      const data = await fetchCats();
      setCats(data);
    } catch (err) {
      console.error("Failed to fetch cats:", err);
    }
  };
  // For now, after each edit/delete, the list is refetched. Can be optimised to not do so if needed.
  useEffect(() => {
    loadCats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCat({
        name: form.name,
        experience: Number(form.years_experience),
        breed: form.breed,
        salary: Number(form.salary),
      });
      setForm({ name: "", years_experience: "", breed: "", salary: "" });
      loadCats();
    } catch (err) {
      console.error("Failed to add cat:", err);
      alert("Failed to add cat");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spy Cats Management Page</h1>
      {Cats.map((cat) => (
        <CatComponent key={cat.id} cat={cat} onUpdate={loadCats} />
      ))}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t pt-6">
        <h2 className="text-xl font-semibold">Add New Spy Cat</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="years_experience"
            placeholder="Years of Experience"
            value={form.years_experience}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={form.breed}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Cat
        </button>
      </form>
    </main>
  );
}
