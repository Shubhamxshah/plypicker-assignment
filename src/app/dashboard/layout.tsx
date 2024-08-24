

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative flex-col md:overflow-hidden">
      <div className="">
        Navbar
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}