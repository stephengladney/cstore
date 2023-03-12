-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryId" TEXT;

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "dropoffTime" TEXT NOT NULL,
    "trackingUrl" TEXT NOT NULL,
    "supportReference" TEXT NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
