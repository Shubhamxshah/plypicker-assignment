import { headers } from 'next/headers';
import AdminDashboard from '@/components/admin-dashboard';
import TeamMemberDashboard from '@/components/team-member-dashboard';

export default function DashboardPage() {
  const headersList = headers();
  const userString = headersList.get('user');
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    // This shouldn't happen if the middleware is working correctly,
    // but it's good to have a fallback
    return <div>Unable to load user information</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <TeamMemberDashboard />
      )}
    </div>
  );
}