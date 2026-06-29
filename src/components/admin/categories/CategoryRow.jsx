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

import DeleteCategoryDialog from "./DeleteCategoryDialog";

export default function CategoryRow({
  category,
  onDelete,
}) {
  return (
    <TableRow>

      {/* Image */}

      <TableCell>

        <img
          src={category.image}
          alt={category.name}
          className="w-14 h-14 rounded-lg object-cover border"
        />

      </TableCell>

      {/* Name */}

      <TableCell className="font-medium">

        {category.name}

      </TableCell>

      {/* Description */}

      <TableCell
        className="
          max-w-xs
          truncate
          text-muted-foreground
        "
      >
        {category.description}
      </TableCell>

      {/* Status */}

      <TableCell>

        <Badge
          variant={
            category.isActive
              ? "default"
              : "secondary"
          }
        >
          {category.isActive
            ? "Active"
            : "Inactive"}
        </Badge>

      </TableCell>

      {/* Created */}

      <TableCell>

        {format(
          new Date(
            category.createdAt
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
              href={`/admin/categories/edit/${category.id}`}
            >

              <Pencil className="h-4 w-4" />

            </Link>

          </Button>

          <DeleteCategoryDialog
            categoryName={category.name}
            onDelete={() =>
              onDelete(category.id)
            }
          />

        </div>

      </TableCell>

    </TableRow>
  );
}