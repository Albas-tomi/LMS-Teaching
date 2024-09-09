import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex shadow-sm items-center justify-between px-4 w-full">
      <div>
        <Sheet>
          <SheetTrigger className="p-4 md:hidden pr-4 hover:opacity-60 transition">
            <HamburgerMenuIcon className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 bg-white">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="ml-auto bg-slate-100 rounded-full p-2 flex items-center justify-center">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
