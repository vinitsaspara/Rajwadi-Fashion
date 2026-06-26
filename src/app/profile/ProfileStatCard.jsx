"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ProfileStatCard({
  icon: Icon,
  title,
  value,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <CardContent className="flex flex-col items-center justify-center py-6">

        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </CardContent>
    </Card>
  );
}