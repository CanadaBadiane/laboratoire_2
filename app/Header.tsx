export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">📚 Ma Bibliothèque</h1>
      <nav className="space-x-4">
        <a href="/" className="hover:underline">
          Accueil
        </a>
        <a href="/catalogue" className="hover:underline">
          Catalogue
        </a>
      </nav>
    </header>
  );
}
