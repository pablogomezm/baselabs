/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `UserProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "UserProduct_userId_idx" ON "UserProduct"("userId");

-- CreateIndex
CREATE INDEX "UserProduct_productId_idx" ON "UserProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProduct_userId_productId_key" ON "UserProduct"("userId", "productId");
