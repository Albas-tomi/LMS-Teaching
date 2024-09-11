"use client";
import React from "react";
import { BarChart, HomeIcon, Search } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { DashboardIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const RouteItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    label: "Search",
    path: "/search",
    icon: Search,
  },
];

const TeacherRouteItems = [
  {
    label: "Dashboard",
    path: "/teacher/course",
    icon: DashboardIcon,
  },
  {
    label: "Analytics",
    path: "/teacher/analytics",
    icon: BarChart,
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacher = pathname.includes("/teacher");
  const routesItem = isTeacher ? TeacherRouteItems : RouteItems;
  return (
    <div className="flex  h-full   flex-col">
      {routesItem.map((route) => (
        <SidebarItem
          key={route.path}
          label={route.label}
          icon={route.icon}
          path={route.path}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
