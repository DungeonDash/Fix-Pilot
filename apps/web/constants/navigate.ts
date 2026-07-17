import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Building2,
  Wrench,
  Bot,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Work Orders",
    url: "/work-orders",
    icon: ClipboardList,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: CalendarDays,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Building2,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: Wrench,
  },
  {
    title: "AI Copilot",
    url: "/ai-copilot",
    icon: Bot,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];