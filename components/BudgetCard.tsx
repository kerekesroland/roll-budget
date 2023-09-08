"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { IUser } from "@/models/User";

import EditBudgetModal from "./modals/EditBudgetModal";
import { Skeleton } from "./ui/skeleton";

type Props = {
  id: string;
  name: string;
  price: number;
  date: string;
  categoryId: string | null;
  type: string;
  user: IUser | null;
  getBudgetCategory: (categoryId: string) => any;
  handleDeleteBudget: (id: string) => Promise<void>;
};
const keyToImage: any = {
  shopping: "/images/Shopping.svg",
  education: "/images/Education.svg",
  money: "/images/Money.svg",
  utility: "/images/Utility.svg",
};

const BudgetCard = ({
  id,
  name,
  price,
  date,
  categoryId,
  type,
  getBudgetCategory,
  handleDeleteBudget,
  user,
}: Props) => {
  const category = getBudgetCategory(categoryId as string);
  const dateString = new Date(date);
  const formattedDate = dateString.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const priceColor = type === "income" ? "green-500" : "red-500";

  const [isBudgetEditModalOpen, setIsBudgetEditModalOpen] =
    useState<boolean>(false);

  //todo Change HUF to dynamic valuta

  if (category == undefined) {
    return (
      <Skeleton className="flex h-[120px] items-center justify-between p-8 rounded-xl">
        <Skeleton className="h-[25px] w-[25px]" />
      </Skeleton>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsBudgetEditModalOpen(true)}
        className="flex flex-col s:flex-row items-start s:items-center justify-between gap-4 s:gap-0 p-[1.5rem] sm:p-8 bg-[#1C293A] rounded-xl transition-all duration-300 hover:brightness-110 cursor-pointer"
      >
        <div className="flex gap-8">
          <Image
            src={keyToImage[category?.icon?.toLowerCase()]}
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

        <div
          className={`flex items-center gap-4 text-xl font-medium text-${priceColor}`}
        >
          {type === "expense" ? "-" : "+"}
          {price} HUF
        </div>
      </div>
      <AnimatePresence>
        {isBudgetEditModalOpen && (
          <div className="bg-gray-900 backdrop-brightness-50 backdrop-blur-sm bg-opacity-50 fixed inset-0 flex items-center justify-center z-[100]">
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              onClick={() => setIsBudgetEditModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center z-[100]"
            >
              <EditBudgetModal
                closeModal={() => setIsBudgetEditModalOpen(false)}
                userId={user?.id as string}
                budget={{
                  id,
                  name,
                  price,
                  date: dateString,
                  category,
                  type,
                  getBudgetCategory,
                  handleDeleteBudget,
                }}
                handleDeleteBudget={handleDeleteBudget}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BudgetCard;
