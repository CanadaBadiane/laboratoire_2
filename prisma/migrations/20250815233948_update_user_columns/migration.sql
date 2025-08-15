/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ISBN` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `edition` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `books` table. All the data in the column will be lost.
  - Added the required column `genre` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."books" DROP CONSTRAINT "books_pkey",
DROP COLUMN "ISBN",
DROP COLUMN "edition",
DROP COLUMN "year",
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("id");
