/*
  Warnings:

  - Added the required column `color` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "color" TEXT NOT NULL;
