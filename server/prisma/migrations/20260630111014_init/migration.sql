-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'member');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
