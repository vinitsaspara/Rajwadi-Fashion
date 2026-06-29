import AdminLayout from "@/components/admin/layout/AdminLayout";

export const metadata = {
  title: "Admin Dashboard | Rajwadi Fashion",
  description: "Rajwadi Fashion Admin Panel",
};

export default function Layout({
  children,
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}