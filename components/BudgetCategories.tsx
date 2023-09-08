"use client";

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { categoryModalOpen } from '@/app/store';
import { IUser } from '@/models/User';
import { Category } from '@prisma/client';

import CategoryCard from './CategoryCard';
import AddCategoryModal from './modals/AddCategoryModal';

interface IBudgetCategories {
  user: IUser | null;
  categories: Category[] | null;
}

const BudgetCategories = ({ user, categories }: IBudgetCategories) => {
  const [isModalOpened, setIsModalOpened] = useRecoilState(categoryModalOpen);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );

  const childVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center h-screen min-w-0 lg:min-w-[450px] border-t-[1px] border-t-[#1C293A] 3xl:border-t-0 3xl:border-l-[1px] 3xl:border-l-[#1C293A]">
      <div className="flex items-center w-full justify-between gap-12 mt-4 mb-4 3xl:px-12">
        <h2 className="font-semibold text-2xl">Categories</h2>
        <div
          onClick={() => toggleState(true)}
          className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
        >
          <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
        </div>
      </div>
      <div className="flex flex-col w-full overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 pl-0 xs:p-0 xs:pr-12 3xl:pl-8 3xl:pb-12 items-start justify-start gap-8">
        {categories?.map((category, idx) => (
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate="visible"
            custom={idx}
            key={category.id}
          >
            <CategoryCard {...category} />
          </motion.div>
        ))}
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
              <AddCategoryModal
                toggleState={toggleState}
                userId={user?.id as string}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetCategories;
