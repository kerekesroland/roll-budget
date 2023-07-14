"use client";
import { mobileOpen } from "@/app/store";
import Image from "next/image";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import MobileNavItem from "./MobileNavItem";
import { SIDENAV_ITEMS } from "@/constants/SideNavItems";
import { Cross2Icon } from "@radix-ui/react-icons";

const MobileNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useRecoilState(mobileOpen);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsMobileOpen(value);
    },
    [setIsMobileOpen]
  );

  return (
    <>
      <div
        onClick={() => toggleState(true)}
        className="md:hidden z-50 cursor-pointer"
      >
        <Image
          width={30}
          height={30}
          src={"images/hamburger.svg"}
          alt="hamburger menu"
        />
      </div>
      {isMobileOpen && <Navigation toggleState={toggleState} />}
    </>
  );
};

export default MobileNavbar;

interface INavigation {
  toggleState: (value: boolean) => void;
}
const Navigation = ({ toggleState }: INavigation) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={handleModalClick}
      className="fixed top-0 left-0 z-[200] bg-gray-900 backdrop-brightness-50 backdrop-blur-sm bg-opacity-50 inset-0 flex flex-col items-center justify-center"
    >
      <Cross2Icon
        onClick={() => toggleState(false)}
        color="red"
        width={24}
        height={24}
        className="fixed top-[25px] right-[25px] cursor-pointer"
      />
      <div className="flex flex-col h-full w-full justify-between items-center py-24">
        {SIDENAV_ITEMS.map((item, idx) => (
          <MobileNavItem
            key={item.name}
            name={item.name}
            index={idx}
            toggleState={toggleState}
          />
        ))}
      </div>
    </div>
  );
};
