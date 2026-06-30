"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required"),

  image: z
    .any(),
    
  description: z
    .string()
    .min(5, "Description is required"),

  isActive: z.boolean(),
});

export default function CategoryForm({
  defaultValues,
  onSubmit,
  loading = false,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),

   defaultValues: {
  name: "",
  image: undefined,
  description: "",
  isActive: true,
  ...defaultValues,
},
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const image = form.watch("image");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>

              <FormControl>
                <Input placeholder="Category Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preview */}

        {image instanceof File && (
  <img
    src={URL.createObjectURL(image)}
    alt="Preview"
    className="w-36 h-36 rounded-lg object-cover border"
  />
)}

        {/* Description */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Category description..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <FormLabel>Active</FormLabel>

                <p className="text-sm text-muted-foreground">
                  Show this category to customers.
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {defaultValues ? "Update Category" : "Create Category"}
        </Button>
      </form>
    </Form>
  );
}
