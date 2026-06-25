"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border rounded-xl p-5">

      <div className="flex items-start justify-between">

        <div>
          <h3 className="font-semibold text-lg">
            {address.fullName}
          </h3>

          <p className="text-sm text-muted-foreground">
            {address.phone}
          </p>
        </div>

        {address.isDefault && (
          <Badge>
            Default
          </Badge>
        )}

      </div>

      <div className="mt-4">
        <p>
          {address.addressLine}
        </p>

        <p>
          {address.city},{" "}
          {address.state} -{" "}
          {address.pincode}
        </p>
      </div>

      <div className="flex gap-2 mt-5">

        <Button
          variant="outline"
          onClick={() =>
            onEdit(address)
          }
        >
          Edit
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            onDelete(
              address.id
            )
          }
        >
          Delete
        </Button>

      </div>

    </div>
  );
}