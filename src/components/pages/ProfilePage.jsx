"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ShoppingBag, Heart, MapPin, LogOut } from "lucide-react";

import { toast } from "sonner";

import { getProfile } from "@/services/auth.service";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import { useDispatch } from "react-redux";

import { logoutUser } from "@/store/slices/authSlice";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        setUser(response.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        User not found
      </div>
    );
  }
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      dispatch(logoutUser());

      toast.success("Logged out successfully");

      router.push("/");
    } finally {
      setLogoutLoading(false);
    }
  };
  return (
    <div className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardContent className="p-8">
          {/* Profile Header */}

          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h1 className="text-2xl font-bold">{user.name}</h1>

              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* User Information */}

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>

              <span className="font-medium">{user.name}</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>

              <span className="font-medium">{user.email}</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>

              <span className="font-medium">{user.role}</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>

              <span className="font-medium text-sm">{user.id}</span>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Actions */}

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => router.push("/orders")}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </Button>

            <Button variant="outline" onClick={() => router.push("/wishlist")}>
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>

            <Button variant="outline" onClick={() => router.push("/address")}>
              <MapPin className="mr-2 h-4 w-4" />
              Address
            </Button>

            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />

              {logoutLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
