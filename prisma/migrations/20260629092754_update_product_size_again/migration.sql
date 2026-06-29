-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductSize" ADD VALUE 'XXS';
ALTER TYPE "ProductSize" ADD VALUE 'XXXL';
ALTER TYPE "ProductSize" ADD VALUE 'XXXXL';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_26';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_28';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_30';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_32';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_34';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_36';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_38';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_40';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_42';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_44';
ALTER TYPE "ProductSize" ADD VALUE 'SIZE_46';
ALTER TYPE "ProductSize" ADD VALUE 'UK_4';
ALTER TYPE "ProductSize" ADD VALUE 'UK_5';
ALTER TYPE "ProductSize" ADD VALUE 'UK_6';
ALTER TYPE "ProductSize" ADD VALUE 'UK_7';
ALTER TYPE "ProductSize" ADD VALUE 'UK_8';
ALTER TYPE "ProductSize" ADD VALUE 'UK_9';
ALTER TYPE "ProductSize" ADD VALUE 'UK_10';
ALTER TYPE "ProductSize" ADD VALUE 'UK_11';
