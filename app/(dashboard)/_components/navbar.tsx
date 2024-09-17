import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacher = pathname.startsWith("/teacher");
  const isUser = pathname.startsWith("/user");

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
      <div className="flex gap-x-2 items-center ">
        {isTeacher || isUser ? (
          <Link href={"/"}>
            <Button variant={"ghost"} size={"sm"}>
              <LogOut className="mx-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link
            className="hover:bg-slate-200 transition p-1 rounded-md "
            href={"/teacher/course"}
          >
            Teacher Mode
          </Link>
        )}

        {/* USER BUTTON */}
        <div className="ml-auto bg-slate-100 rounded-full p-2 flex items-center justify-center">
          {<UserButton afterSwitchSessionUrl="/" /> || <></>}
        </div>
        {/* USER BUTTON */}
      </div>
    </div>
  );
};

export default Navbar;
