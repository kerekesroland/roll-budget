import MobileNavbar from "@/components/MobileNavbar";
import React from "react";

type Props = {};

const Budget = (props: Props) => {
  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <h2>Budget</h2>
    </>
  );
};

export default Budget;
