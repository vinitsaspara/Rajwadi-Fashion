"use client";

import { useEffect, useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Loader2, Plus } from "lucide-react";

import { getCategories } from "@/services/category.service";

import BasicInfoSection from "./BasicInfoSection";

import PricingSection from "./PricingSection";

import StatusSection from "./StatusSection";

import ProductColorCard from "./ProductColorCard";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

const sizeSchema = z.object({
  size: z.string().min(1, "Size is required"),

  stock: z.coerce.number().min(0, "Stock cannot be negative"),
});

const colorSchema = z.object({
  colorName: z.string().min(1, "Color is required"),

  images: z.any(),

  sizes: z.array(sizeSchema).min(1, "Add at least one size"),
});

const formSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  description: z.string().min(10, "Description is required"),

  categoryId: z.string().min(1, "Category is required"),

  price: z.coerce.number().positive(),

  discountPrice: z.coerce.number().positive(),

  isFeatured: z.boolean(),

  isBestSeller: z.boolean(),

  isActive: z.boolean(),

  colors: z.array(colorSchema).min(1, "Add at least one color"),
});

export default function ProductForm({
  defaultValues,
  loading = false,
  onSubmit,
}) {
  const [categories, setCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",

      description: "",

      categoryId: "",

      price: 0,

      discountPrice: 0,

      isFeatured: false,

      isBestSeller: false,

      isActive: true,

      colors: [
        {
          colorName: "",

          images: [],

          sizes: [
            {
              size: "",

              stock: 0,
            },
          ],
        },
      ],

      ...defaultValues,
    },
  });

  const {
    fields: colorFields,

    append: appendColor,

    remove: removeColor,
  } = useFieldArray({
    control: form.control,

    name: "colors",
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await getCategories();

        setCategories(response.categories);
      } catch (error) {
        console.log(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleFormSubmit = (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discountPrice", values.discountPrice);
    formData.append("categoryId", values.categoryId);
    formData.append("isFeatured", values.isFeatured);
    formData.append("isBestSeller", values.isBestSeller);
    formData.append("isActive", values.isActive);

    const colors = values.colors.map((color) => ({
      colorName: color.colorName,

      existingImages: color.existingImages || [],

      sizes: color.sizes.map((size) => ({
        size: size.size,

        stock: Number(size.stock),
      })),
    }));

    formData.append("colors", JSON.stringify(colors));

    values.colors.forEach((color, index) => {
      color.images.forEach((image) => {
        if (image instanceof File) {
          formData.append(`colorImages-${index}`, image);
        }
      });
    });

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        {/* Basic Information */}

        <BasicInfoSection control={form.control} categories={categories} />

        {/* Pricing */}

        <PricingSection control={form.control} watch={form.watch} />

        {/* Product Status */}

        <StatusSection control={form.control} />

        {/* Product Variants */}

        <div className="rounded-xl border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Product Variants</h2>

              <p className="text-sm text-muted-foreground mt-1">
                Add colors, images and available sizes.
              </p>
            </div>

            <Button
              type="button"
              onClick={() =>
                appendColor({
    colorName: "",

    existingImages: [],

    images: [],

    sizes: [
        {
            size: "",
            stock: 0,
        },
    ],
})
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Color
            </Button>
          </div>

          {colorFields.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              No color variants added.
            </div>
          )}

          <div className="space-y-6">
            {colorFields.map((field, index) => (
              <ProductColorCard
                key={field.id}
                control={form.control}
                watch={form.watch}
                setValue={form.setValue}
                colorIndex={index}
                removeColor={removeColor}
              />
            ))}
          </div>
        </div>

        {/* Submit */}

        <Button type="submit" disabled={loading} className="w-full h-12">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {defaultValues ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
