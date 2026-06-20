/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId,color,size]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropIndex
DROP INDEX "CartItem_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_color_size_key" ON "CartItem"("userId", "productId", "color", "size");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
