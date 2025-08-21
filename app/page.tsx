"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue dans ta bibliothèque 📚
      </h1>
      <p className="text-gray-700 mb-6">
        Gère tes livres, ajoute de nouvelles lectures et explore ta collection.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/books/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          ➕ Ajouter un livre
        </Link>
        <Link
          href="/books"
          className="bg-green-600 text-white px-5 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
        >
          📖 Voir la liste
        </Link>
      </div>
    </div>
  );
}
