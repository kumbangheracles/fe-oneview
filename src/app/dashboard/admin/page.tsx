import DashboardPage from "@/components/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: "This is dashboard for admin",
};

const AdminDashboardPage = () => {
  return <DashboardPage role="admin" />;
};

export default AdminDashboardPage;
