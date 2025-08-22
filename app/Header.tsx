// Header
export default function Header() {
  return (
    <header className="bg-purple-600 text-white px-6 py-8">
      <h1 className="text-2xl font-bold text-center">📚 Ma Bibliothèque</h1>
      {/* Barre de navigation */}
      <nav className="space-x-4 mt-4">
        <a href="/" className="hover:underline">
          Accueil
        </a>
        <a href="/books" className="hover:underline">
          Catalogue
        </a>
        <a href="/books/new" className="hover:underline">
          Ajouter un livre
        </a>
      </nav>
    </header>
  );
}
