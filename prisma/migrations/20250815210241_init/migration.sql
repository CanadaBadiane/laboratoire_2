-- CreateTable
CREATE TABLE "public"."books" (
    "ISBN" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "edition" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("ISBN")
);
