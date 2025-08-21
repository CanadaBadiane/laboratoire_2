"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewBook() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [read, setRead] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmit(true);
    try {
      const body = {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        read: read,
      };
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || json.success !== true) {
        throw new Error(json.error || "Création du livre impossible");
      }
      router.push("/books");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un livre</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="titre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titre :
          </label>
          <input
            id="titre"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="auteur"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Auteur :
          </label>
          <input
            id="auteur"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="auteur"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Genre :
          </label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1">Lu</label>
          <select
            className="border rounded w-full p-2"
            value={read}
            onChange={(e) => setRead(e.target.value)}
            required
          >
            <option value="Non lu">Non lu</option>
            <option value="Lu">Lu</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
