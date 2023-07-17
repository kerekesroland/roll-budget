"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

type Props = {
  name: string;
  price: number;
  date: string;
  categoryId: string | null;
  getBudgetCategory: (categoryId: string) => any;
  type: string;
};
const keyToImage: any = {
  shopping: "/images/Shopping.svg",
  education: "/images/Education.svg",
  bills: "/images/Money.svg",
  utility: "/images/Utility.svg",
};

const BudgetCard = ({
  name,
  price,
  date,
  categoryId,
  getBudgetCategory,
  type,
}: Props) => {
  const category = getBudgetCategory(categoryId as string);
  const dateString = new Date(date);
  const formattedDate = dateString.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const priceColor = type === "income" ? "green-500" : "red-500";

  //todo Change HUF to dynamic valuta

  if (category == undefined) {
    return (
      <Skeleton className="flex h-[120px] items-center justify-between p-8 rounded-xl">
        <Skeleton className="h-[25px] w-[25px]" />
      </Skeleton>
    );
  }

  return (
    <div className="flex items-center justify-between p-8 bg-[#1C293A] rounded-xl">
      <div className="flex gap-8">
        <Image
          src={keyToImage[category?.name?.toLowerCase()]}
          alt={name}
          width={60}
          height={60}
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-medium">{name}</h3>
          <span className="text-md font-medium text-[#79889D]">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className={`text-xl font-medium text-${priceColor}`}>
        {type === "expense" ? "-" : "+"}
        {price} HUF
      </div>
    </div>
  );
};

export default BudgetCard;
