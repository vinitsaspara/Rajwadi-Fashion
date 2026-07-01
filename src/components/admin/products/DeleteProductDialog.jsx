"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteProductDialog({
  productName,
  onDelete,
}) {
  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>

        <Button
          size="icon"
          variant="destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Product?
          </AlertDialogTitle>

          <AlertDialogDescription>

            Are you sure you want to delete

            <span className="font-semibold">
              {" "}
              "{productName}"
            </span>

            ?

            <br />

            <br />

            This action will make the product inactive and it will no longer be visible to customers.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}