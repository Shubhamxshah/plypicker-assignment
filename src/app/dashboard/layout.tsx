import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AdminNavbar from "@/components/adminNavbar";
import TeamNavbar from "@/components/teamNavbar";
const inter = Inter({ subsets: ["latin"] });
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Lago",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userString = headersList.get("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    // This shouldn't happen if the middleware is working correctly,
    // but it's good to have a fallback
    return <div>Unable to load user information</div>;
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative w-full flex items-center justify-center">
            {user.role === "admin" ? <AdminNavbar /> : <TeamNavbar />}
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
