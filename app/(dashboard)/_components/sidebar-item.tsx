"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
type SidebarProps = {
  label: string;
  icon: any;
  path: string;
};

const SidebarItem = ({ label, icon: Icon, path }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  //   CEK APAKAH PATHNAME DAN PATH SAMA
  const isActive = (pathname === "/" && path === "/") || pathname === path;
  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex gap-x-2  h-full text-slate-500 text-sm transition-all  pl-6  hover:bg-slate-300/20",
        isActive && "bg-sky-200/20 text-sky-500 hover:bg-sky-300/20 "
      )}
    >
      <div className="flex  items-center gap-x-2 py-4">
        <Icon
          className={cn(
            "transition-all text-slate-500 ",
            isActive && "text-sky-500"
          )}
        />
        {label}
      </div>
      {/* garis */}
      <div
        className={`flex h-full border-r-4 border-sky-500 ml-auto transition-all items-center gap-x-2 py-4 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </button>
  );
};

export default SidebarItem;
