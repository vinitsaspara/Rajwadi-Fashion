"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SIZE_OPTIONS = [
  // Clothing
  { value: "XXS", label: "XXS" },
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
  { value: "XXXL", label: "XXXL" },
  { value: "XXXXL", label: "XXXXL" },

  // Waist
  { value: "SIZE_26", label: "26" },
  { value: "SIZE_28", label: "28" },
  { value: "SIZE_30", label: "30" },
  { value: "SIZE_32", label: "32" },
  { value: "SIZE_34", label: "34" },
  { value: "SIZE_36", label: "36" },
  { value: "SIZE_38", label: "38" },
  { value: "SIZE_40", label: "40" },
  { value: "SIZE_42", label: "42" },
  { value: "SIZE_44", label: "44" },
  { value: "SIZE_46", label: "46" },

  // Shoes
  { value: "UK_4", label: "UK 4" },
  { value: "UK_5", label: "UK 5" },
  { value: "UK_6", label: "UK 6" },
  { value: "UK_7", label: "UK 7" },
  { value: "UK_8", label: "UK 8" },
  { value: "UK_9", label: "UK 9" },
  { value: "UK_10", label: "UK 10" },
  { value: "UK_11", label: "UK 11" },

  // Free Size
  { value: "Free_Size", label: "Free Size" },
];

export default function SizeSelect({
  control,
  name,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>

          <FormLabel>
            Size
          </FormLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >

            <FormControl>

              <SelectTrigger>

                <SelectValue placeholder="Select Size" />

              </SelectTrigger>

            </FormControl>

            <SelectContent>

              {SIZE_OPTIONS.map((size) => (
                <SelectItem
                  key={size.value}
                  value={size.value}
                >
                  {size.label}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          <FormMessage />

        </FormItem>
      )}
    />
  );
}