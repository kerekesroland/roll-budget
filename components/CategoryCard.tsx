"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { keyToImage } from "@/lib/utils";

import EditCategoryModal from "./modals/EditCategoryModal";

type Props = {
  id: string;
  name: string;
  icon: string;
  limit: number;
  currencyType: any;
};

const CategoryCard = ({ id, name, icon, limit, currencyType }: Props) => {
  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIsCategoryEditModalOpen(true)}
        className="flex items-center rounded-xl gap-6 transition-all duration-300 hover:bg-gray-500/10 p-0 xl:p-4 w-[100%] cursor-pointer"
      >
        <Image src={keyToImage[icon]} alt={name} width={60} height={60} />
        <div className="flex flex-col items-start justify-center gap-2">
          <h3 className="text-xl font-medium">
            {name.length > 10 ? name.substring(0, 10).concat("...") : name}
          </h3>
          <span className="text-xl font-medium text-[#79889D]">
            {limit} {currencyType}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {isCategoryEditModalOpen && (
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
              onClick={() => setIsCategoryEditModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center z-[100]"
            >
              <EditCategoryModal
                category={{ id, name, icon, limit, currencyType }}
                toggleState={() => setIsCategoryEditModalOpen(false)}
                userId=""
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryCard;
