"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Package, LayoutGrid } from "lucide-react";
import { Heart, ShoppingCart, LogOut } from "lucide-react";

import Container from "../shared/Container";
import SearchInput from "@/components/search/SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { logoutUser } from "@/store/slices/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          <Link href="/" className="text-2xl font-bold">
            Rajwadi Fashion
          </Link>

          {/* Navigation Links + Search */}

          <div className="hidden md:flex items-center flex-1 mx-8 gap-8">
            <Link
              href="/categories"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
            >
              <LayoutGrid size={18} />
              Categories
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
            >
              <Package size={18} />
              Products
            </Link>

            <div className="flex-1">
  <SearchInput />
</div>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative group">
              <Heart
                size={22}
                className="transition group-hover:text-red-500"
              />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md border-2 border-white font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingCart size={22} />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-md border-2 border-white font-semibold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarFallback>
                        {user.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="font-medium">{user.name}</p>

                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
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
                  href="/signup"
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
