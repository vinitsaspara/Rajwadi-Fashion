"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  Heart,
  ShoppingCart,
  LogOut,
} from "lucide-react";

import Container from "../shared/Container";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { logoutUser } from "@/store/slices/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logoutUser());

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
            href="/"
            className="text-2xl font-bold"
          >
            Rajwadi Fashion
          </Link>

          {/* Search */}

          <div className="hidden md:flex w-full max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-lg px-4 py-2 outline-none"
            />
          </div>

          {/* Actions */}

          <div className="flex items-center gap-4">

            <Link href="/wishlist">
              <Heart
                size={22}
                className="hover:text-primary transition"
              />
            </Link>

            <Link href="/cart">
              <ShoppingCart
                size={22}
                className="hover:text-primary transition"
              />
            </Link>

            {user ? (
              <DropdownMenu>

                <DropdownMenuTrigger asChild>
                  <button className="outline-none">

                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarFallback>
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >

                  <div className="px-3 py-2">
                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        "/profile"
                      )
                    }
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={
                      handleLogout
                    }
                    className="cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">

                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

        </div>
      </Container>
    </header>
  );
}