"use client";
import { mobileOpen } from "@/app/store";
import Image from "next/image";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

const MobileNavbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useRecoilState(mobileOpen);

  const toggleState = useCallback(() => {
    setIsMobileOpen(!isMobileOpen);
  }, [isMobileOpen, setIsMobileOpen]);

  //   console.log(isMobileOpen);
  return (
    <div onClick={toggleState} className="fixed md:hidden z-50 top-5 right-10">
      <Image
        width={30}
        height={30}
        src={"images/hamburger.svg"}
        alt="hamburger menu"
      />
    </div>
  );
};

export default MobileNavbar;
