"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  read: boolean;
};

export default function CataloguePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchMode, setSearchMode] = useState("titre");
  const [searchTerm, setSearchTerm] = useState("");

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/books", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || json.success !== true) {
        throw new Error(json.error || "Erreur lors du chargement");
      }
      setBooks(json.data as Book[]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Voulez-vous supprimer ce livre ?")) return;
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      await load();
      alert("Livre supprimé avec succès !");
    } else {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Suppression impossible");
    }
  }

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    if (searchMode === "title") return book.title.toLowerCase().includes(term);
    if (searchMode === "author")
      return book.author.toLowerCase().includes(term);
    if (searchMode === "genre") return book.genre.toLowerCase().includes(term);
    return true;
  });

  return (
    <main className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Mes Livres</h1>
        <Link className="underline" href="/books/new">
          Ajouter un nouveau livre
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <select
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="title">Titre</option>
          <option value="author">Auteur</option>
          <option value="genre">Genre</option>
        </select>

        <input
          type="text"
          placeholder={`Rechercher par ${
            searchMode === "title"
              ? "titre"
              : searchMode === "author"
              ? "auteur"
              : "genre"
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-64"
        />
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && filteredBooks.length === 0 && <p>Aucun livre trouvé.</p>}

      <ul className="space-y-3">
        {filteredBooks.map((b) => (
          <li
            key={b.id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div>
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-gray-600">
                {b.author} • {b.genre} • {b.read ? "Lu" : "Non lu"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link className="underline" href={`/books/${b.id}/edit`}>
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(b.id)}
                className="text-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
