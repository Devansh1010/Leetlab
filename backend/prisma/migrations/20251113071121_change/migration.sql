/*
  Warnings:

  - Changed the type of `testCaseNo` on the `TestCase` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TestCase" DROP COLUMN "testCaseNo",
ADD COLUMN     "testCaseNo" INTEGER NOT NULL;
