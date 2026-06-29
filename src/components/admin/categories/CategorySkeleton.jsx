"use client";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CategorySkeleton() {
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

          {Array.from({
            length: 6,
          }).map((_, index) => (

            <TableRow key={index}>

              {/* Image */}

              <TableCell>

                <Skeleton className="h-14 w-14 rounded-lg" />

              </TableCell>

              {/* Name */}

              <TableCell>

                <Skeleton className="h-5 w-32" />

              </TableCell>

              {/* Description */}

              <TableCell>

                <Skeleton className="h-5 w-60" />

              </TableCell>

              {/* Status */}

              <TableCell>

                <Skeleton className="h-6 w-20 rounded-full" />

              </TableCell>

              {/* Created */}

              <TableCell>

                <Skeleton className="h-5 w-28" />

              </TableCell>

              {/* Actions */}

              <TableCell>

                <div className="flex justify-end gap-2">

                  <Skeleton className="h-9 w-9 rounded-md" />

                  <Skeleton className="h-9 w-9 rounded-md" />

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}