import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui//layout/sidebar/app-sidebar";
import TopNavbar from "@/components/ui/layout/navbar/top-navbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <TopNavbar />

        <main className="flex-1 bg-slate-50 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}