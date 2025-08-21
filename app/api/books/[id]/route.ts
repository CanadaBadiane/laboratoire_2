import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/books/[id] - Modifier un livre par ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "ID du livre invalide",
        },
        { status: 400 }
      );
    }

    // Vérifier si le livre existe
    const foundBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!foundBook) {
      return NextResponse.json(
        {
          success: false,
          error: "Le livre avec cet ID n'existe pas",
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { read } = body;

    // Mettre à jour le livre
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        ...(typeof read === "boolean" && { read }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBook,
      message: "Livre modifié avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la modification du livre:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la modification du livre",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[id] - Supprimer un livre par ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "ID du livre invalide",
        },
        { status: 400 }
      );
    }

    // Vérifier si le livre existe
    const foundBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!foundBook) {
      return NextResponse.json(
        {
          success: false,
          error: "Aucun livre avec cet ID n'a été trouvé",
        },
        { status: 404 }
      );
    }

    // Supprimer le livre
    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Le livre "${foundBook.title}" supprimé avec succès`,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du livre:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la suppression du livre",
      },
      { status: 500 }
    );
  }
}

// GET /api/books/[id] - Obtenir un livre par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Validation de l'ID
    if (isNaN(id) || id <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "ID du livre invalide",
        },
        { status: 400 }
      );
    }

    // Récupérer le livre
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: "Livre non trouvé",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
      message: "Livre trouvé",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du livre:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération du livre",
      },
      { status: 500 }
    );
  }
}
