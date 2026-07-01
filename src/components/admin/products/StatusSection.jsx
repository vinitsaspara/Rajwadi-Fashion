"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";

export default function StatusSection({
  control,
}) {
  return (
    <div className="rounded-xl border p-6 space-y-6">

      <div>

        <h2 className="text-xl font-semibold">
          Product Status
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Configure how this product appears in your store.
        </p>

      </div>

      {/* Featured Product */}

      <FormField
        control={control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">

            <div>

              <FormLabel>
                Featured Product
              </FormLabel>

              <p className="text-sm text-muted-foreground">
                Display this product in the Featured Products section.
              </p>

            </div>

            <FormControl>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />

            </FormControl>

          </FormItem>
        )}
      />

      {/* Best Seller */}

      <FormField
        control={control}
        name="isBestSeller"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">

            <div>

              <FormLabel>
                Best Seller
              </FormLabel>

              <p className="text-sm text-muted-foreground">
                Highlight this product as a best seller.
              </p>

            </div>

            <FormControl>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />

            </FormControl>

          </FormItem>
        )}
      />

      {/* Active */}

      <FormField
        control={control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-4">

            <div>

              <FormLabel>
                Active Product
              </FormLabel>

              <p className="text-sm text-muted-foreground">
                Customers can view and purchase this product.
              </p>

            </div>

            <FormControl>

              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />

            </FormControl>

          </FormItem>
        )}
      />

    </div>
  );
}