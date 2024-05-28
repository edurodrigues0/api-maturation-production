-- CreateTable
CREATE TABLE "colaborators" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isOnSector" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productions" (
    "id" SERIAL NOT NULL,
    "activities" TEXT NOT NULL,
    "litersOfProduct" INTEGER NOT NULL,
    "quantityProduced" INTEGER NOT NULL,
    "realizedIn" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "colaboratorId" INTEGER NOT NULL,

    CONSTRAINT "productions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "productions" ADD CONSTRAINT "productions_colaboratorId_fkey" FOREIGN KEY ("colaboratorId") REFERENCES "colaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
