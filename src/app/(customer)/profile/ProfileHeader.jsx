"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileHeader({
  user,
}) {
  return (
    <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl text-white p-8 shadow-lg">

      <div className="flex flex-col md:flex-row items-center gap-6">

        <Avatar className="h-24 w-24 border-4 border-white">
          <AvatarFallback className="text-3xl font-bold bg-white text-black">
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left flex-1">

          <h1 className="text-3xl font-bold">
            {user.name}
          </h1>

          <p className="text-gray-300 mt-1">
            {user.email}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">

            <Badge
              variant="secondary"
              className="bg-white text-black hover:bg-white"
            >
              {user.role}
            </Badge>

            <Badge
              variant="outline"
              className="border-gray-300 text-white"
            >
              Member Since{" "}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </Badge>

          </div>

        </div>

      </div>

    </div>
  );
}