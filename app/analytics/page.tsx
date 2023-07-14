import MobileNavbar from "@/components/MobileNavbar";
import React from "react";

type Props = {};

const Analytics = (props: Props) => {
  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div>Analytics</div>
    </>
  );
};

export default Analytics;
