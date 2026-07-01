"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BasicInfoSection({
  control,
  categories,
}) {
  return (
    <div className="space-y-6 rounded-xl border p-6">

      <div>

        <h2 className="text-xl font-semibold">
          Basic Information
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Enter the basic product details.
        </p>

      </div>

      {/* Product Name */}

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>

            <FormLabel>
              Product Name
            </FormLabel>

            <FormControl>

              <Input
                placeholder="Enter product name"
                {...field}
              />

            </FormControl>

            <FormMessage />

          </FormItem>
        )}
      />

      {/* Category */}

      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>

            <FormLabel>
              Category
            </FormLabel>

            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >

              <FormControl>

                <SelectTrigger>

                  <SelectValue placeholder="Select category" />

                </SelectTrigger>

              </FormControl>

              <SelectContent>

                {categories.map(
                  (category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  )
                )}

              </SelectContent>

            </Select>

            <FormMessage />

          </FormItem>
        )}
      />

      {/* Description */}

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>

            <FormLabel>
              Description
            </FormLabel>

            <FormControl>

              <Textarea
                rows={6}
                placeholder="Write product description..."
                {...field}
              />

            </FormControl>

            <FormMessage />

          </FormItem>
        )}
      />

    </div>
  );
}