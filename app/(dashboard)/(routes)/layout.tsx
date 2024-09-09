"use client";
import { UserButton } from "@clerk/nextjs";
import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";
const DahsboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* SIDEBAR */}
      <div className="fixed h-full  inset-y-0 w-56 hidden md:flex  z-50">
        <Sidebar />
      </div>
      {/* SIDEBAR */}

      {/* NAVBAR */}
      <div className="h-[80px] md:pl-56 fixed flex justify-between inset-y-0 z-40  w-full">
        <Navbar />
      </div>
      {/* NAVBAR */}

      {/* MAIN CONTENT */}
      <main className="md:pl-56 pt-[80px]">{children}</main>
      {/* MAIN CONTENT */}
    </div>
  );
};

export default DahsboardLayout;
