"use client";

import Link from "next/link";

import {
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

import Container from "./Container";
import SearchBar from "./SearchBar";

import { NAV_LINKS } from "@/constants/navigation";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const { totalItems } = useCart();
  const { items } = useWishlist();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <Container>
        <div className="h-20 flex items-center justify-between gap-8">
          <Link
            href="/"
            className="
              text-2xl
              font-bold
              whitespace-nowrap
            "
          >
            Rajwadi Fashion
          </Link>

          <nav className="hidden lg:flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  text-sm
                  font-medium
                  hover:text-gray-500
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/wishlist"
              className="relative"
            >
              <Heart size={22} />

              {items?.length > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {items.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingBag size={22} />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-black
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/profile">
              <User size={22} />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;