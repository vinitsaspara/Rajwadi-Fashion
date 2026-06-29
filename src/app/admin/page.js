import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import DashboardChart from "@/components/admin/dashboard/DashboardChart";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import RecentReviews from "@/components/admin/dashboard/RecentReviews";

export default function AdminDashboard() {
  const stats = {
    revenue: 0,
    orders: 0,
    products: 0,
    customers: 0,
    reviews: 0,
  };

  const recentOrders = [
    {
      id: 1,
      orderNumber: "ORD-1001",
      customer: "Rudra Saspara",
      total: 2799,
      status: "CONFIRMED",
      date: "29 Jun 2026",
    },
    {
      id: 2,
      orderNumber: "ORD-1002",
      customer: "Vinit Saspara",
      total: 1999,
      status: "PENDING",
      date: "28 Jun 2026",
    },
    {
      id: 3,
      orderNumber: "ORD-1003",
      customer: "Amit Patel",
      total: 3599,
      status: "DELIVERED",
      date: "27 Jun 2026",
    },
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome back, Admin 👋
        </p>

      </div>

      <DashboardStats
        stats={stats}
      />

      <DashboardChart />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentOrders
          orders={recentOrders}
        />

        <RecentReviews />

      </div>

    </div>
  );
}