import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AdminNavbar from "@/components/adminNavbar";
import TeamNavbar from "@/components/teamNavbar";
const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userString = headersList.get("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <div>Unable to load user information</div>;
  }

  return (
    <html lang="en">
      <body className={inter.className}>

          <div className="relative w-full flex items-center justify-center">
            {user.role === "admin" ? <AdminNavbar /> : <TeamNavbar />}
          </div>
          {children}
    
      </body>
    </html>
  );
}
