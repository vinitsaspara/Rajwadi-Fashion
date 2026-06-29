"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import { toast } from "sonner";

import { useDispatch } from "react-redux";

import { logoutUser } from "@/store/slices/authSlice";

import { getProfile } from "@/services/auth.service";
import { getProfileStats } from "@/services/profile.service";

import ProfileHeader from "./ProfileHeader";
import ProfileStatCard from "./ProfileStatCard";
import ProfileQuickActions from "./ProfileQuickActions";
import ProfileInformation from "./ProfileInformation";

export default function ProfilePage() {
  const router = useRouter();

  const dispatch =
    useDispatch();

  const [user, setUser] =
    useState(null);

  const [stats, setStats] =
    useState({
      orders: 0,
      wishlist: 0,
      addresses: 0,
      reviews: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [
    logoutLoading,
    setLogoutLoading,
  ] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {
      try {
        setLoading(true);

        const [
          profileResponse,
          statsResponse,
        ] = await Promise.all([
          getProfile(),
          getProfileStats(),
        ]);

        setUser(
          profileResponse.user
        );

        setStats(
          statsResponse.stats
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleLogout =
    async () => {
      try {
        setLogoutLoading(true);

        dispatch(
          logoutUser()
        );

        toast.success(
          "Logged out successfully"
        );

        router.push("/");
      } finally {
        setLogoutLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      <ProfileHeader
        user={user}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <ProfileStatCard
          icon={ShoppingBag}
          title="Orders"
          value={stats.orders}
          onClick={() =>
            router.push(
              "/orders"
            )
          }
        />

        <ProfileStatCard
          icon={Heart}
          title="Wishlist"
          value={
            stats.wishlist
          }
          onClick={() =>
            router.push(
              "/wishlist"
            )
          }
        />

        <ProfileStatCard
          icon={MapPin}
          title="Addresses"
          value={
            stats.addresses
          }
          onClick={() =>
            router.push(
              "/address"
            )
          }
        />

        <ProfileStatCard
          icon={Star}
          title="Reviews"
          value={
            stats.reviews
          }
          onClick={() =>
            router.push(
              "/reviews"
            )
          }
        />

      </div>

      <ProfileQuickActions
        onLogout={
          handleLogout
        }
        logoutLoading={
          logoutLoading
        }
      />

      <ProfileInformation
        user={user}
      />

    </div>
  );
}