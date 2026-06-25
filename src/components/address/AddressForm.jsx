"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressForm({
  initialData,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <Input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <Input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        name="addressLine"
        placeholder="Address Line"
        value={formData.addressLine}
        onChange={handleChange}
      />

      <Input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <Input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />

      <Input
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={
            formData.isDefault
          }
          onChange={(e) =>
            setFormData(
              (prev) => ({
                ...prev,
                isDefault:
                  e.target
                    .checked,
              })
            )
          }
        />

        Set as Default Address
      </label>

      <Button
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Address"}
      </Button>
    </form>
  );
}