"use client";

import Link from "next/link";

import { format } from "date-fns";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import DeleteProductDialog from "./DeleteProductDialog";

export default function ProductRow({
  product,
  onDelete,
}) {
  // Total Stock
  const totalStock =
    product.colors.reduce(
      (total, color) =>
        total +
        color.sizes.reduce(
          (sum, size) =>
            sum + size.stock,
          0
        ),
      0
    );

  // Thumbnail
  const thumbnail =
    product.colors?.[0]?.images?.[0] ||
    "/placeholder.png";

  return (
    <TableRow>

      {/* Image */}

      <TableCell>

        <img
          src={thumbnail}
          alt={product.name}
          className="w-14 h-14 rounded-lg object-cover border"
        />

      </TableCell>

      {/* Product */}

      <TableCell>

        <div className="space-y-1">

          <p className="font-semibold">
            {product.name}
          </p>

          <p className="text-xs text-muted-foreground">
            SKU : {product.sku}
          </p>

        </div>

      </TableCell>

      {/* Category */}

      <TableCell>

        {product.category?.name}

      </TableCell>

      {/* Price */}

      <TableCell>

        ₹{Number(product.price)}

      </TableCell>

      {/* Discount */}

      <TableCell>

        {product.discountPrice ? (
          <span className="font-medium text-green-600">
            ₹
            {Number(
              product.discountPrice
            )}
          </span>
        ) : (
          "-"
        )}

      </TableCell>

      {/* Stock */}

      <TableCell>

        <Badge
          variant={
            totalStock > 0
              ? "default"
              : "destructive"
          }
        >
          {totalStock}
        </Badge>

      </TableCell>

      {/* Featured */}

      <TableCell>

        <Badge
          variant={
            product.isFeatured
              ? "default"
              : "secondary"
          }
        >
          {product.isFeatured
            ? "Yes"
            : "No"}
        </Badge>

      </TableCell>

      {/* Best Seller */}

      <TableCell>

        <Badge
          variant={
            product.isBestSeller
              ? "default"
              : "secondary"
          }
        >
          {product.isBestSeller
            ? "Yes"
            : "No"}
        </Badge>

      </TableCell>

      {/* Status */}

      <TableCell>

        <Badge
          variant={
            product.isActive
              ? "default"
              : "destructive"
          }
        >
          {product.isActive
            ? "Active"
            : "Inactive"}
        </Badge>

      </TableCell>

      {/* Created */}

      <TableCell>

        {format(
          new Date(
            product.createdAt
          ),
          "dd MMM yyyy"
        )}

      </TableCell>

      {/* Actions */}

      <TableCell>

        <div className="flex justify-end gap-2">

          <Button
            asChild
            size="icon"
            variant="outline"
          >

            <Link
              href={`/admin/products/edit/${product.id}`}
            >

              <Pencil className="h-4 w-4" />

            </Link>

          </Button>

          <DeleteProductDialog
            productName={
              product.name
            }
            onDelete={() =>
              onDelete(
                product.id
              )
            }
          />

        </div>

      </TableCell>

    </TableRow>
  );
}