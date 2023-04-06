/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "curso" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);
