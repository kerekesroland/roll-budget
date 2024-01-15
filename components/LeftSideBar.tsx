"use client";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/constants/SideNavItems";

import SideNavItem from "./SideNavItem";
import { useLocale, useTranslations } from "next-intl";

const LeftSideBar = () => {
  const t = useTranslations("sidebar");
  const pathName = usePathname();
  const locale = useLocale();

  const translatedName = (name: string) => {
    return t(name.toLowerCase());
  };

  return (
    <div className="hidden w-[150px] md:min-w-[300px] sticky left-0 top-0 h-screen border-r-[1px] md:flex flex-col justify-between p-8 py-16 border-r-[#1C293A]">
      {SIDENAV_ITEMS.map((item) => (
        <SideNavItem
          active={pathName === `/${locale}/${item.name.toLowerCase()}`}
          name={translatedName(item.name)}
          href={item.href}
          icon={item.icon}
          key={item.name}
        />
      ))}
    </div>
  );
};

export default LeftSideBar;
