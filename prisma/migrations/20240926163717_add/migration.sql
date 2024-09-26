/*
  Warnings:

  - Added the required column `type` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InfoType" AS ENUM ('RECRUITMENT', 'CONTACT');

-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "type" "InfoType" NOT NULL;
