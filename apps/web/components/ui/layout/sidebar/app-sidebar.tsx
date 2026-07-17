"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "../../../../constants/navigate";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* ---------- Header ---------- */}
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            FS
          </div>

          <div>
            <h2 className="text-sm font-bold">FS Copilot</h2>
            <p className="text-xs text-muted-foreground">
              OPS PLATFORM
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ---------- Navigation ---------- */}
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pathname === item.url}
                render={
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* ---------- Footer ---------- */}
      <SidebarFooter>
        <div className="px-3 py-4 text-xs text-muted-foreground">
          Version 0.1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}