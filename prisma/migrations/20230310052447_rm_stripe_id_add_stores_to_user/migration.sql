/*
  Warnings:

  - You are about to drop the column `stripeId` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "stripeId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stores" INTEGER[] DEFAULT ARRAY[0]::INTEGER[];
