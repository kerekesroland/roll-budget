"use client";

import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import { budgetCategories, budgetModalOpen } from "@/app/store";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { DatePickerForm } from "./CustomCalendar";
import { Combobox } from "./ComboBox";
import { BudgetOptions } from "@/constants/BudgetOptions";
import { IUser, TBudget } from "@/models/User";
import { Category } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import AddBudgetModal from "./modals/AddBudgetModal";
import BudgetCard from "./BudgetCard";
import BudgetInfo from "./BudgetInfo";

type Props = {
  user: IUser | null;
  categories: Category[] | null;
  budgets: TBudget[] | null;
};

const BudgetList = ({ user, categories, budgets }: Props) => {
  const [isModalOpened, setIsModalOpened] = useRecoilState(budgetModalOpen);
  const [bCategories, setBCategories] = useRecoilState(budgetCategories);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );

  const categoryLabelValues = categories?.map((category) => {
    return {
      label: category?.name,
      value: category?.name.toLowerCase(),
    };
  });

  useEffect(() => {
    if (categories) {
      setBCategories(categories);
    }
  }, [categories, setBCategories]);

  const getBudgetCategory = (categoryId: string) => {
    return bCategories.find((category) => category.id === categoryId);
  };

  const budgetValue = useMemo(() => {
    return budgets?.reduce((acc, curr) => {
      if (curr.type === "income") {
        return acc + curr.price;
      } else {
        return acc - curr.price;
      }
    }, 0);
  }, [budgets]);

  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div className="flex items-center justify-between mt-4 mb-4">
        <div className="flex items-center gap-12">
          <h2 className="font-semibold text-2xl">Budgets</h2>
          <div
            onClick={() => toggleState(true)}
            className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
          >
            <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
          </div>
        </div>
        <DatePickerForm />
      </div>
      <div className="flex items-center justify-between mt-16">
        <Combobox title="Sort by" options={BudgetOptions.sortBy} />
        <Combobox title="Type" options={BudgetOptions.types} />
        <Combobox title="Price" options={BudgetOptions.price} />
        <Combobox title="Category" options={categoryLabelValues} />
      </div>
      <BudgetInfo
        numberOfTransactions={budgets?.length || 0}
        value={budgetValue || 0}
      />
      <div className="flex flex-col gap-12">
        {budgets?.map((budget) => (
          <BudgetCard
            getBudgetCategory={getBudgetCategory}
            key={budget?.id}
            {...budget}
            categoryId={budget.categoryId}
          />
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
              <AddBudgetModal
                toggleState={toggleState}
                userId={user?.id as string}
                categories={bCategories}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BudgetList;
