"use client";

import { categoryModalOpen } from "@/app/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import AddCategoryModal from "./modals/AddCategoryModal";

const BudgetCategories = () => {
  const [isModalOpened, setIsModalOpened] = useRecoilState(categoryModalOpen);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );
  return (
    <div className="flex flex-col items-center h-screen min-w-[450px] border-l-[1px] border-l-[#1C293A]">
      <div className="flex items-center w-full justify-between gap-12 mt-4 mb-4 p-[1.5rem] xs:p-12 md:py-8 lg:py-12">
        <h2 className="font-semibold text-2xl">Categories</h2>
        <div
          onClick={() => toggleState(true)}
          className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
        >
          <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpened && (
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
              onClick={() => toggleState(false)}
              className="fixed inset-0 flex items-center justify-center z-[100]"
            >
              <AddCategoryModal />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetCategories;
