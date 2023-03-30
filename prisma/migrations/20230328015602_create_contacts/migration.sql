-- AlterTable
ALTER TABLE "Contacts" ADD COLUMN     "display" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profile" BOOLEAN NOT NULL DEFAULT false;
