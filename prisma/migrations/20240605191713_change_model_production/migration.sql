/*
  Warnings:

  - You are about to drop the column `litersOfProduct` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `quantityProduced` on the `productions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productions" DROP COLUMN "litersOfProduct",
DROP COLUMN "quantityProduced",
ADD COLUMN     "minilitersOfProduct" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "piecesOfAlcool" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "piecesOfDoubleSidedGlue" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "piecesOfFinalTrim" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityProducedOfAlcool" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityProducedOnFinalTrim" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityProducedOfSidedGlue" INTEGER NOT NULL DEFAULT 0;
