"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  User,
  Mail,
  Shield,
  Calendar,
  Fingerprint,
  Clock,
} from "lucide-react";

export default function ProfileInformation({
  user,
}) {
  const info = [
    {
      icon: User,
      label: "Name",
      value: user.name,
    },
    {
      icon: Mail,
      label: "Email",
      value: user.email,
    },
    {
      icon: Shield,
      label: "Role",
      value: user.role,
    },
    {
      icon: Fingerprint,
      label: "User ID",
      value: user.id,
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: new Date(
        user.createdAt
      ).toLocaleDateString(),
    },
    {
      icon: Clock,
      label: "Last Updated",
      value: new Date(
        user.updatedAt
      ).toLocaleDateString(),
    },
  ];

  return (
    <Card className="shadow-sm">

      <CardContent className="p-6">

        <h2 className="text-2xl font-bold mb-6">
          Account Information
        </h2>

        <div className="space-y-4">

          {info.map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.label
                  }
                >
                  <div className="flex items-center justify-between gap-5">

                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">

                        <Icon className="h-5 w-5 text-primary" />

                      </div>

                      <span className="text-muted-foreground">
                        {
                          item.label
                        }
                      </span>

                    </div>

                    <span className="font-medium text-right break-all">

                      {item.value}

                    </span>

                  </div>

                  {index !==
                    info.length -
                      1 && (
                    <Separator className="mt-4" />
                  )}

                </div>
              );
            }
          )}

        </div>

      </CardContent>

    </Card>
  );
}