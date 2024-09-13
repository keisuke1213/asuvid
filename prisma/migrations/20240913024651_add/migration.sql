/*
  Warnings:

  - Added the required column `status` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RECRUITING', 'DEADLINE_APPROACHING', 'END');

-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "status" "Status" NOT NULL;
