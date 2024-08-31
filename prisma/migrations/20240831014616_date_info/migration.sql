/*
  Warnings:

  - You are about to drop the column `date` on the `Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Info" DROP COLUMN "date";

-- CreateTable
CREATE TABLE "Date" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "infoId" INTEGER NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "Info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
