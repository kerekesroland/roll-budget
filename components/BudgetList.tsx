"use client";

import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import { budgetCategories, budgetModalOpen } from "@/app/store";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { DatePickerForm } from "./CustomCalendar";
import { Combobox } from "./ComboBox";
import { BudgetOptions } from "@/constants/BudgetOptions";
import { IUser } from "@/models/User";
import { Category } from "@prisma/client";

type Props = {
  user: IUser | null;
  categories: Category[];
};

const BudgetList = ({ user, categories }: Props) => {
  const [__, setIsModalOpened] = useRecoilState(budgetModalOpen);
  const [_, setBCategories] = useRecoilState(budgetCategories);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );

  const categoryLabelValues = categories?.map((category) => {
    return {
      label: category?.name,
      value: category?.name,
    };
  });

  useEffect(() => {
    setBCategories(categories);
  }, [categories, setBCategories]);

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
    </>
  );
};

export default BudgetList;
