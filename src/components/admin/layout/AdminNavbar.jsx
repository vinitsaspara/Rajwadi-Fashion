"use client";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import {
  Search,
  Bell,
  LogOut,
} from "lucide-react";

import { toast } from "sonner";

import { logoutUser } from "@/store/slices/authSlice";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function AdminNavbar() {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());

    toast.success(
      "Logged out successfully"
    );

    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      {/* Center */}

      <div className="hidden md:block w-full max-w-md mx-10">

        <div className="relative">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2
            h-4 w-4 text-muted-foreground"
          />

          <Input
            placeholder="Search..."
            className="pl-10"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <Button
          variant="ghost"
          size="icon"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">

          <Avatar>

            <AvatarFallback>
              A
            </AvatarFallback>

          </Avatar>

          <div className="hidden lg:block">

            <p className="font-medium">
              Admin
            </p>

            <p className="text-xs text-muted-foreground">
              Administrator
            </p>

          </div>

        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />

          Logout
        </Button>

      </div>

    </header>
  );
}