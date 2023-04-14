/*
  Warnings:

  - You are about to drop the column `isAccepted` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isAccepted",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'unconfirmed';
