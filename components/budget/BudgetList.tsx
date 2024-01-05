"use client";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

import { budgetAddModalOpen, budgetCategories } from "@/app/store";
import { BudgetOptions } from "@/constants/BudgetOptions";
import useFilteredBudgets from "@/hooks/useFilteredBudgets";
import { IUser, TBudget } from "@/models/User";
import { Category } from "@prisma/client";

import BudgetCard from "./BudgetCard";
import BudgetInfo from "./BudgetInfo";
import { Combobox } from "../ComboBox";
import { DatePickerForm } from "../CustomCalendar";
import MobileNavbar from "../MobileNavbar";
import AddBudgetModal from "../modals/AddBudgetModal";
import { BudgetProps, FilterKeys, IFilterProps } from "./types";

const BudgetList = ({ user, categories, budgets }: BudgetProps) => {
  const router = useRouter();
  const [isModalOpened, setIsModalOpened] = useRecoilState(budgetAddModalOpen);
  const [bCategories, setBCategories] = useRecoilState(budgetCategories);
  const [filters, setFilters] = useState<IFilterProps>({
    sortBy: "",
    type: "",
    price: "",
    category: "",
    date: undefined,
  });

  const { sortedBudgets, getBudgetCategory } = useFilteredBudgets({
    categories,
    budgets,
    filters,
  });

  const handleSetFilterValue = useCallback(
    (key: FilterKeys, value: string) => {
      setFilters((prevFilters) => {
        const currentValue = prevFilters[key];
        const newValue = currentValue === value ? "" : value;
        return { ...prevFilters, [key]: newValue };
      });
    },
    [setFilters]
  );

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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Check if the content overflows and apply pr-4 class
      if (container.scrollHeight > container.clientHeight) {
        container.classList.add("pr-4");
      } else {
        container.classList.remove("pr-4");
      }
    }
  }, [sortedBudgets]); // Add other dependencies if needed

  const budgetValue = useMemo(() => {
    return sortedBudgets?.reduce((acc, curr) => {
      if (curr.type === "income") {
        return acc + curr.price;
      } else {
        return acc - curr.price;
      }
    }, 0);
  }, [sortedBudgets]);

  const handleDeleteBudget = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/api/budget/${id}`);
        router.refresh();
        toast.success("Successfully deleted budget");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [router]
  );

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div className="flex flex-col lg:flex-row  items-start lg:items-center justify-between gap-4 lg:gap-0 mt-4 mb-4">
        <div className="flex items-center gap-12">
          <h2 className="font-semibold text-2xl">Budgets</h2>
          <div
            onClick={() => toggleState(true)}
            className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
          >
            <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
          </div>
        </div>
        <DatePickerForm
          extraStyle="!w-full !lg:w-[240px]"
          extraContainerStyle="!w-full lg:!w-[240px]"
          callback={handleSetFilterValue}
          filterKey="date"
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between mt-16 gap-4">
        <Combobox
          title="Sort by"
          options={BudgetOptions.sortBy}
          callback={handleSetFilterValue}
          filterKey="sortBy"
          extraStyle="w-full lg:w-[200px]"
        />
        <Combobox
          title="Type"
          options={BudgetOptions.types}
          callback={handleSetFilterValue}
          filterKey="type"
          extraStyle="w-full lg:w-[200px]"
        />
        <Combobox
          title="Price"
          options={BudgetOptions.price}
          callback={handleSetFilterValue}
          filterKey="price"
          extraStyle="w-full lg:w-[200px]"
        />
        <Combobox
          title="Category"
          options={categoryLabelValues}
          callback={handleSetFilterValue}
          filterKey="category"
          extraStyle="w-full lg:w-[200px]"
        />
      </div>
      <BudgetInfo
        numberOfTransactions={sortedBudgets?.length || 0}
        value={budgetValue || 0}
        date={filters?.date?.toDateString() || new Date().toDateString()}
      />
      <div
        ref={containerRef}
        className="flex flex-col gap-8 max-h-[calc(100vh-416px)] overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700"
      >
        {sortedBudgets?.map((budget, idx) => (
          <motion.div
            variants={childVariants}
            initial="hidden"
            animate="visible"
            custom={idx}
            key={budget?.id}
          >
            <BudgetCard
              getBudgetCategory={getBudgetCategory}
              {...budget}
              categoryId={budget.categoryId}
              handleDeleteBudget={handleDeleteBudget}
              user={user}
            />
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
