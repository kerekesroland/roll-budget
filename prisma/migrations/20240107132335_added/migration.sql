/*
  Warnings:

  - Added the required column `senderId` to the `ActivateToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivateToken" ADD COLUMN     "senderId" TEXT NOT NULL;
