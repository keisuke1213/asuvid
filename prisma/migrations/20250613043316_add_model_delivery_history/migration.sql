/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `DeliveryHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DeliveryHistory" DROP COLUMN "deliveryDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
