/*
  Warnings:

  - Added the required column `currencyType` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyType` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('USD', 'HUF');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "currencyType" "CurrencyType" NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "currencyType" "CurrencyType" NOT NULL;
