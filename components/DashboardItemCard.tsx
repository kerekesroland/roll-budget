"use client";
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { keyToImage } from '@/lib/utils';
import { ICategory } from '@/models/Category';

type Props = {
  name: string;
  price: number;
  categoryId: string | null;
  categories: Array<ICategory>;
};

type TValuta = "HUF" | "USD";

const DashboardItemCard = ({ name, price, categories, categoryId }: Props) => {
  const getBudgetCategory = useCallback(
    (categoryId: string) => {
      return categories?.find((category) => category.id === categoryId);
    },
    [categories]
  );

  const category =
    categoryId && (getBudgetCategory(categoryId)?.icon as string);

  const [valuta, setValuta] = useState<TValuta>("HUF");
  return (
    <div className="h-[161px] min-w-full s:h-[251px] s:min-w-[290px] md:h-[161px] md:min-w-[180px] xl:h-[171px] xl:min-w-[200px] bg-textPrimary rounded-[15px] relative">
      <Image
        className="absolute top-0 left-0 rounded-tl-[15px] rounded-br-[15px]"
        src={keyToImage[category as string]}
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
