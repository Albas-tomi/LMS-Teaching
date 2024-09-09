import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full py-5 w-full flex flex-col overflow-y-auto  border-r border-gray-200 shadow-sm">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <div className="pt-6">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
