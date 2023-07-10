"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  name: string;
  icon: string;
  price: number;
};

type TValuta = "HUF" | "USD";

const DashboardItemCard = ({ name, icon, price }: Props) => {
  const [valuta, setValuta] = useState<TValuta>("HUF");
  return (
    <div className="h-[171px] min-w-[200px] bg-textPrimary rounded-[15px] relative">
      <Image
        className="absolute top-0 left-0 rounded-tl-[15px] rounded-br-[15px]"
        src={icon}
        alt={name}
        width="60"
        height="60"
      />
      <div className="flex flex-col h-full px-4 py-8 justify-end items-start">
        <span className="text-[#1C293A] font-medium text-2xl">
          {price} {valuta}
        </span>
        <h4 className="mt-2 text-[#1C293A]/70 font-medium text-sm">{name}</h4>
      </div>
    </div>
  );
};

export default DashboardItemCard;
