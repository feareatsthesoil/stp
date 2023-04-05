-- CreateTable
CREATE TABLE "Purchases" (
    "id" SERIAL NOT NULL,
    "purchasePrice" DECIMAL(65,30) NOT NULL,
    "stripeIntentId" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);
