"use client";

import Link from "next/link";

import Container from "./Container";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { totalItems } = useCart();
  const { items } = useWishlist();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            Rajwadi Fashion
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/products">
              Products
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/wishlist">
              Wishlist ({items.length})
            </Link>

            <Link href="/cart">
              Cart ({totalItems})
            </Link>

            {isAuthenticated ? (
              <Link href="/profile">
                Profile
              </Link>
            ) : (
              <Link href="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;