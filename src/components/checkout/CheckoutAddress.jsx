"use client";

import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CheckoutAddress({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) {
  return (
    <div>

      <h2 className="text-xl font-semibold mb-5">
        Delivery Address
      </h2>

      <div className="space-y-4">

        {addresses.map((address) => {
          const selected =
            selectedAddress?.id ===
            address.id;

          return (
            <Card
              key={address.id}
              onClick={() =>
                setSelectedAddress(
                  address
                )
              }
              className={`cursor-pointer p-5 transition-all duration-200 border-2 ${
                selected
                  ? "border-black"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >

              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold text-lg">
                      {address.fullName}
                    </h3>

                    {address.isDefault && (
                      <Badge>
                        Default
                      </Badge>
                    )}

                  </div>

                  <p className="text-muted-foreground mt-1">
                    {address.phone}
                  </p>

                </div>

                {selected && (
                  <CheckCircle2 className="text-green-600 h-6 w-6" />
                )}

              </div>

              <div className="mt-4 text-sm text-muted-foreground leading-6">

                <p>{address.addressLine}</p>

                <p>
                  {address.city},{" "}
                  {address.state}
                </p>

                <p>{address.pincode}</p>

              </div>

            </Card>
          );
        })}

      </div>

    </div>
  );
}