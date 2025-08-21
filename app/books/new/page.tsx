"use client";

import { useState } from "react";

export default function AjouterLivrePage() {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Livre ajouté :", { titre, auteur, description });
    // Tu peux envoyer les données à une API ici
  };

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
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
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
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description :
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
