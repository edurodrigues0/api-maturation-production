/*
  Warnings:

  - You are about to drop the column `minilitersOfProduct` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `piecesOfAlcool` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `piecesOfDoubleSidedGlue` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `piecesOfFinalTrim` on the `productions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productions" DROP COLUMN "minilitersOfProduct",
DROP COLUMN "piecesOfAlcool",
DROP COLUMN "piecesOfDoubleSidedGlue",
DROP COLUMN "piecesOfFinalTrim",
ADD COLUMN     "minilitersOfAlcool" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minilitersOfDoubleSidedGlue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minilitersOfFinalTrim" INTEGER NOT NULL DEFAULT 0;
