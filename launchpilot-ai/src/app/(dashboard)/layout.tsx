import { Sidebar } from "@/components/shared/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl px-4 py-8 pt-16 lg:pt-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
