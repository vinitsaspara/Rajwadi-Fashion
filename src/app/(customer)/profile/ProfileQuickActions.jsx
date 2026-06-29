"use client";

import {
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function ProfileQuickActions({
  onLogout,
  logoutLoading,
}) {
  const router = useRouter();

  const actions = [
    {
      title: "My Orders",
      icon: ShoppingBag,
      href: "/orders",
    },
    {
      title: "Wishlist",
      icon: Heart,
      href: "/wishlist",
    },
    {
      title: "Addresses",
      icon: MapPin,
      href: "/address",
    },
    {
      title: "My Reviews",
      icon: Star,
      href: "/reviews",
    },
  ];

  return (
    <div className="space-y-5">

      <div>
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <p className="text-muted-foreground">
          Manage your account quickly.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              variant="outline"
              className="h-28 flex-col gap-3 hover:bg-primary hover:text-white transition-all"
              onClick={() =>
                router.push(action.href)
              }
            >
              <Icon className="h-7 w-7" />

              <span>
                {action.title}
              </span>
            </Button>
          );
        })}

      </div>

      <Button
        variant="destructive"
        className="w-full h-12"
        disabled={logoutLoading}
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-5 w-5" />

        {logoutLoading
          ? "Logging Out..."
          : "Logout"}
      </Button>

    </div>
  );
}