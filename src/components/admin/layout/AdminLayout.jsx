"use client";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Content */}

        <div className="flex-1 flex flex-col min-h-screen">

          {/* Navbar */}

          <AdminNavbar />

          {/* Page Content */}

          <main className="flex-1 p-6 overflow-y-auto">

            {children}

          </main>

        </div>

      </div>

    </div>
  );
}