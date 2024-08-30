// pages/dashboard.tsx
import { headers } from "next/headers";
import AdminDashboard from '@/components/admin-dashboard';
import TeamMemberDashboard from '@/components/team-member-dashboard';
import { ProductProvider } from '@/components/ProductContext';

const DashboardPage = () => {
  const headersList = headers();
  const userString = headersList.get("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <div>Unable to load user information</div>;
  }

  return (
    <ProductProvider>
      {user.role === "admin" ? <AdminDashboard /> : <TeamMemberDashboard />}
    </ProductProvider>
  );
};

export default DashboardPage;