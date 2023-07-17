import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  icon: string;
  limit: number;
};

const keyToImage: any = {
  shopping: "/images/Shopping.svg",
  education: "/images/Education.svg",
  money: "/images/Money.svg",
  utility: "/images/Utility.svg",
};

//todo Add Valuta to the Limit type and every field that has a price, for now I'm leaving it at HUF only

const CategoryCard = ({ name, icon, limit }: Props) => {
  return (
    <div className="flex items-center gap-6">
      <Image src={keyToImage[icon]} alt={name} width={60} height={60} />
      <div className="flex flex-col items-start justify-center gap-2">
        <h3 className="text-xl font-medium">{name}</h3>
        <span className="text-xl font-medium text-[#79889D]">{limit} HUF</span>
      </div>
    </div>
  );
};

export default CategoryCard;
