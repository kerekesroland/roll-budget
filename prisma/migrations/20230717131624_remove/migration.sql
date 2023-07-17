/*
  Warnings:

  - You are about to drop the column `icon` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "icon",
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
