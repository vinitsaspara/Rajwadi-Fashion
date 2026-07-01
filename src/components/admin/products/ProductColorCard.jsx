"use client";

import { Trash2 } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import ProductSizeTable from "./ProductSizeTable";

export default function ProductColorCard({
  control,
  watch,
  setValue,
  colorIndex,
  removeColor,
}) {
  const images = watch(`colors.${colorIndex}.images`) || [];

  const existingImages = watch(`colors.${colorIndex}.existingImages`) || [];

  return (
    <div className="rounded-xl border p-6 space-y-6 bg-white">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Color Variant #{colorIndex + 1}
        </h3>

        <Button
          variant="destructive"
          size="icon"
          type="button"
          onClick={() => removeColor(colorIndex)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Color Name */}

      <FormField
        control={control}
        name={`colors.${colorIndex}.colorName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color Name</FormLabel>

            <FormControl>
              <Input placeholder="Black" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      {existingImages.length > 0 && (
        <div className="space-y-3">
          <FormLabel>Existing Images</FormLabel>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt="Existing"
                  className="h-32 w-full rounded-lg object-cover border"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => {
                    const updated = existingImages.filter(
                      (_, i) => i !== index,
                    );

                    setValue(`colors.${colorIndex}.existingImages`, updated);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Images */}

      <FormField
        control={control}
        name={`colors.${colorIndex}.images`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload New Images</FormLabel>

            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => field.onChange(Array.from(e.target.files))}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      {/* Image Preview */}

      {images.length > 0 && (
        <div className="space-y-3">
          <FormLabel>New Image Preview</FormLabel>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="h-32 w-full rounded-lg object-cover border"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={() => {
                    const updated = images.filter((_, i) => i !== index);

                    setValue(`colors.${colorIndex}.images`, updated);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}

      <ProductSizeTable control={control} colorIndex={colorIndex} />
    </div>
  );
}
