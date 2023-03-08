/*
  Warnings:

  - You are about to drop the column `stripeAccessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `stripeAccountId` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "stripeAccessToken",
DROP COLUMN "stripeAccountId";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "stripeAccessToken" TEXT,
ADD COLUMN     "stripeAccountId" TEXT;
