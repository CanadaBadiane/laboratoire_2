import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <div className="flex min-h-screen">
          <main className="flex-1 p-6">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
