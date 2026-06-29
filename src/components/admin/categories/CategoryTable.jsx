"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";

import CategoryRow from "./CategoryRow";

export default function CategoryTable({
  categories,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-24">
              Image
            </TableHead>

            <TableHead>
              Name
            </TableHead>

            <TableHead>
              Description
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Created At
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {categories.map((category) => (

            <CategoryRow
              key={category.id}
              category={category}
              onDelete={onDelete}
            />

          ))}

        </TableBody>

      </Table>

    </div>
  );
}