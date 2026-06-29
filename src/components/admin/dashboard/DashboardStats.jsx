import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Star,
} from "lucide-react";

import DashboardCard from "./DashboardCard";

export default function DashboardStats({
  stats,
}) {
  const dashboardCards = [
    {
      title: "Total Revenue",
      value: `₹${stats?.revenue ?? 0}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: stats?.orders ?? 0,
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Total Products",
      value: stats?.products ?? 0,
      icon: Package,
      color: "text-orange-600",
    },
    {
      title: "Total Customers",
      value: stats?.customers ?? 0,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Total Reviews",
      value: stats?.reviews ?? 0,
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

      {dashboardCards.map((card) => (

        <DashboardCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />

      ))}

    </div>
  );
}