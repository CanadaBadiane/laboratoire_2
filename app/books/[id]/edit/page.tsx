"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  read: boolean;
};

export default function EditBook() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [read, setRead] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/books/${id}`);
        const json = await res.json();
        if (!res.ok || json.success !== true)
          throw new Error(json.error || "Livre introuvable");
        setBook(json.data);
        setRead(json.data.read ? "Lu" : "Non lu");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          read: read === "Lu",
        }),
      });
      const json = await res.json();
      if (!res.ok || json.success !== true)
        throw new Error(json.error || "Modification impossible");
      alert("Livre modifié avec succès !");
      router.push(`/books/`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return <main className="container mx-auto p-8">Chargement...</main>;
  if (error)
    return <main className="container mx-auto p-8 text-red-700">{error}</main>;
  if (!book) return null;

  return (
    <main className="container mx-auto p-8 max-w-lg">
      <h1 className="text-2xl font-semibold mb-6">
        Modifier le statut de lecture
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Titre</label>
          <input
            className="border rounded w-full p-2 bg-gray-100"
            value={book.title}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Auteur</label>
          <input
            className="border rounded w-full p-2 bg-gray-100"
            value={book.author}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Genre</label>
          <input
            className="border rounded w-full p-2 bg-gray-100"
            value={book.genre}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1">Statut</label>
          <select
            className="border rounded w-full p-2"
            value={read}
            onChange={(e) => setRead(e.target.value)}
            required
          >
            <option value="Lu">Lu</option>
            <option value="Non lu">Non lu</option>
          </select>
        </div>
        {error && <p className="text-red-700">{error}</p>}
        <button
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </main>
  );
}
