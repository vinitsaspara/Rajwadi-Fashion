"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ProductRow from "./ProductRow";

export default function ProductTable({
  products,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-[90px]">
              Image
            </TableHead>

            <TableHead>
              Product
            </TableHead>

            <TableHead>
              Category
            </TableHead>

            <TableHead>
              Price
            </TableHead>

            <TableHead>
              Discount
            </TableHead>

            <TableHead>
              Stock
            </TableHead>

            <TableHead>
              Featured
            </TableHead>

            <TableHead>
              Best Seller
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Created
            </TableHead>

            <TableHead className="text-right">
              Actions
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {products.map((product) => (

            <ProductRow
              key={product.id}
              product={product}
              onDelete={onDelete}
            />

          ))}

        </TableBody>

      </Table>

    </div>
  );
}