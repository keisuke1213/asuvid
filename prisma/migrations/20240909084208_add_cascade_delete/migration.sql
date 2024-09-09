-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_infoId_fkey";

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_infoId_fkey" FOREIGN KEY ("infoId") REFERENCES "Info"("id") ON DELETE CASCADE ON UPDATE CASCADE;
