"use client";

import { useFieldArray } from "react-hook-form";

import { Plus, Trash2 } from "lucide-react";
import SizeSelect from "./SizeSelect";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function ProductSizeTable({
  control,
  colorIndex,
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `colors.${colorIndex}.sizes`,
  });

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h4 className="text-lg font-semibold">
          Sizes & Stock
        </h4>

        <Button
          type="button"
          size="sm"
          onClick={() =>
            append({
              size: "",
              stock: 0,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Size
        </Button>

      </div>

      {fields.length === 0 && (

        <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">

          No sizes added.

        </div>

      )}

      <div className="space-y-4">

        {fields.map(
          (
            field,
            sizeIndex
          ) => (
            <div
              key={field.id}
              className="grid grid-cols-12 gap-4 items-end rounded-lg border p-4"
            >

              {/* Size */}

              <div className="col-span-5">

                <SizeSelect
  control={control}
  name={`colors.${colorIndex}.sizes.${sizeIndex}.size`}
/>

              </div>

              {/* Stock */}

              <div className="col-span-5">

                <FormField
                  control={control}
                  name={`colors.${colorIndex}.sizes.${sizeIndex}.stock`}
                  render={({ field }) => (
                    <FormItem>

                      <FormLabel>
                        Stock
                      </FormLabel>

                      <FormControl>

                        <Input
                          type="number"
                          min={0}
                          placeholder="0"
                          {...field}
                        />

                      </FormControl>

                      <FormMessage />

                    </FormItem>
                  )}
                />

              </div>

              {/* Delete */}

              <div className="col-span-2 flex justify-end">

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    remove(sizeIndex)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}