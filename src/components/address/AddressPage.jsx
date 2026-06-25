"use client";

import {
  useEffect,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import { toast } from "sonner";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/services/address.service";

import {
  setAddresses,
} from "@/store/slices/addressSlice";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function AddressPage() {
  const dispatch =
    useDispatch();

  const [addresses, setLocalAddresses] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editingAddress,
    setEditingAddress] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const fetchAddresses =
    async () => {
      try {
        const response =
          await getAddresses();

        setLocalAddresses(
          response.addresses
        );

        dispatch(
          setAddresses(
            response.addresses
          )
        );
      } catch (error) {
        toast.error(
          "Failed to load addresses"
        );
      }
    };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit =
    async (data) => {
      try {
        setLoading(true);

        if (
          editingAddress
        ) {
          await updateAddress(
            editingAddress.id,
            data
          );

          toast.success(
            "Address updated"
          );
        } else {
          await addAddress(
            data
          );

          toast.success(
            "Address added"
          );
        }

        setOpen(false);

        setEditingAddress(
          null
        );

        fetchAddresses();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deleteAddress(
          id
        );

        toast.success(
          "Address deleted"
        );

        fetchAddresses();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to delete address"
        );
      }
    };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Addresses
        </h1>

        <Dialog
          open={open}
          onOpenChange={
            setOpen
          }
        >
          <DialogTrigger
            asChild
          >
            <Button
              onClick={() =>
                setEditingAddress(
                  null
                )
              }
            >
              Add Address
            </Button>
          </DialogTrigger>

          <DialogContent>

            <DialogHeader>
              <DialogTitle>
                {editingAddress
                  ? "Edit Address"
                  : "Add Address"}
              </DialogTitle>
            </DialogHeader>

            <AddressForm
              initialData={
                editingAddress
              }
              onSubmit={
                handleSubmit
              }
              loading={
                loading
              }
            />

          </DialogContent>
        </Dialog>

      </div>

      <div className="grid gap-4">

        {addresses.map(
          (
            address
          ) => (
            <AddressCard
              key={
                address.id
              }
              address={
                address
              }
              onEdit={() => {
                setEditingAddress(
                  address
                );

                setOpen(
                  true
                );
              }}
              onDelete={
                handleDelete
              }
            />
          )
        )}

      </div>

    </div>
  );
}