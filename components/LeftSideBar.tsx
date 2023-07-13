"use client";
import { SIDENAV_ITEMS } from "@/constants/SideNavItems";
import SideNavItem from "./SideNavItem";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

const LeftSideBar = () => {
  const pathName = usePathname();

  return (
    <div className="hidden w-[150px] md:w-[300px] sticky left-0 top-0 h-screen border-r-[1px] md:flex flex-col justify-between p-8 py-16 border-r-[#1C293A]">
      {SIDENAV_ITEMS.map((item) => (
        <SideNavItem
          active={pathName === `/${item.name.toLowerCase()}`}
          name={item.name}
          icon={item.icon}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default LeftSideBar;