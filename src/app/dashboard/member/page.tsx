import DashboardPage from "@/components/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Member",
  description: "This is dashboard for member",
};

const MemberDashboardPage = () => {
  return <DashboardPage role="member" />;
};

export default MemberDashboardPage;
