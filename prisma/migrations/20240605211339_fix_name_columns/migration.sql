/*
  Warnings:

  - You are about to drop the column `quantityProducedOfAlcool` on the `productions` table. All the data in the column will be lost.
  - You are about to drop the column `quantityProducedOfSidedGlue` on the `productions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productions" DROP COLUMN "quantityProducedOfAlcool",
DROP COLUMN "quantityProducedOfSidedGlue",
ADD COLUMN     "quantityProducedOnAlcool" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantityProducedOnSidedGlue" INTEGER NOT NULL DEFAULT 0;
