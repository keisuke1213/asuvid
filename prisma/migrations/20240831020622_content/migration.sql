/*
  Warnings:

  - Added the required column `content` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Info" ADD COLUMN     "content" TEXT NOT NULL;
