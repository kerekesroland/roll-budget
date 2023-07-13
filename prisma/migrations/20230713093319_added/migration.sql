/*
  Warnings:

  - Added the required column `email` to the `ActivateToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivateToken" ADD COLUMN     "email" TEXT NOT NULL;
