"use client";
import React from "react";
import { HomeIcon, Search } from "lucide-react";
import SidebarItem from "./sidebar-item";

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

const SidebarRoutes = () => {
  const routesItem = RouteItems;
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
