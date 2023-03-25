-- AlterTable
ALTER TABLE "Contacts" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "ends_at" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
