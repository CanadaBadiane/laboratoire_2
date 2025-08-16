import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/books - Obtenir tous les livres
export async function GET() {
  try {
    const books = await prisma.book.findMany();

    return NextResponse.json({
      success: true,
      data: books,
      message: `${books.length} livre(s) trouvé(s)`,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des livres",
      },
      { status: 500 }
    );
  }
}

// POST /api/books - Ajouter un nouveau livre
export async function POST(request: NextRequest) {
  try {
    const infos = await request.json();
    const { title, author, genre, read } = infos;

    // Validation des données
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le titre du livre est obligatoire et doit etre une chaine de caractere non vide",
        },
        { status: 400 }
      );
    }

    if (!author || typeof author !== "string" || author.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "L'auteur du livre est obligatoire et doit etre une chaine de caractere non vide",
        },
        { status: 400 }
      );
    }

    if (!genre || typeof genre !== "string" || genre.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le genre du livre est obligatoire et doit etre une chaine de caractere non vide",
        },
        { status: 400 }
      );
    }

    // Ajouter le livre
    const book = await prisma.book.create({
      data: {
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
        ...(typeof read === "boolean" && { read }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: book,
        message: "Livre ajouté avec succès!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Erreur lors de l'ajout du livre:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'ajout du livre",
      },
      { status: 500 }
    );
  }
}
