-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "pickupTime" DROP NOT NULL,
ALTER COLUMN "dropoffTime" DROP NOT NULL,
ALTER COLUMN "trackingUrl" DROP NOT NULL,
ALTER COLUMN "supportReference" DROP NOT NULL;
