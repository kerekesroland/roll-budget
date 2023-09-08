"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";

import { budgetCategories } from "@/app/store";
import { BudgetOptions } from "@/constants/BudgetOptions";
import { ValutaOptions } from "@/constants/ValutaOptions";
import { useSchemas } from "@/hooks/useSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

import { Combobox } from "../ComboBox";
import CustomButton from "../CustomButton";
import { DatePickerForm } from "../CustomCalendar";
import GeneralHeader from "../GeneralHeader";
import InputController from "../InputController";
import NumberController from "../NumberController";

type Budget = {
  id: string;
  name: string;
  price: number;
  date: Date;
  category: ICategory;
  type: string;
  getBudgetCategory: (categoryId: string) => any;
  handleDeleteBudget: (id: string) => Promise<void>;
};

interface IBudget {
  name: string;
  price: number;
  category: ICategory;
  date: Date;
  type: string;
}

interface ICategory {
  icon: string;
  id: string;
  userId: string;
  name: string;
  limit: number;
}

interface IEditBudget {
  closeModal: () => void;
  handleDeleteBudget: (id: string) => Promise<void>;
  userId: string;
  budget: Budget;
}

const EditBudgetModal = ({
  userId,
  closeModal,
  budget,
  handleDeleteBudget,
}: IEditBudget) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bCategories, setBCategories] = useRecoilState(budgetCategories);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const selectableCategories = bCategories?.map((category) => {
    return {
      label: category?.name,
      value: category?.name.toLowerCase(),
      id: category?.id,
      userId: category?.userId,
      name: category?.name.toLowerCase(),
      limit: category?.limit,
      icon: category?.icon,
    };
  });

  const { editBudgetSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBudget>({
    resolver: yupResolver(editBudgetSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    values: budget,
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IBudget> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await axios.put(`/api/budget/${budget.id}`, {
        ...data,
        category: data.category.id,
        userId: userId,
      });
      toast.success(`Successfully edited ${data.name}!`);
      router.refresh();
      closeModal();
    } catch (error: any) {
      toast.error(error.data.response.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDate = (date: Date) => {
    setValue("date", date);
  };

  const handleSetCategory = (data: string) => {
    const selectedCategoryId = selectableCategories.find(
      (c) => c.value === data,
    );
    if (selectedCategoryId) {
      setValue("category", selectedCategoryId);
    }
  };

  const handleSelectType = (data: string) => {
    setValue("type", data);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await handleDeleteBudget(budget.id);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] max-h-[600px] 2xl:max-h-none overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 rounded-2xl p-8 sm:p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Edit Budget"
          subtitle="Fill out the information to edit your budget!"
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label="Name"
            isTouched={false}
            error={errors.name?.message as string}
            register={register("name")}
            placeholder={"Groceries"}
            value={""}
            extraStyle="max-w-full"
          />
          <NumberController
            label="Price"
            isTouched={false}
            type="number"
            error={errors.price?.message as string}
            register={register("price")}
            placeholder={"40000"}
            value={""}
            valuta
            valutaOptions={ValutaOptions}
            extraStyle="border-r-0 rounded-tr-none rounded-br-none max-w-full"
            extraContainerStyle="max-w-full"
          />

          <div className="py-8">
            <label>Type</label>
            <Combobox
              title="Type"
              options={BudgetOptions.types}
              extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
              callback={handleSelectType}
              defaultValue={budget.type}
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="py-8 w-1/2">
              <label>Date</label>
              <DatePickerForm
                defaultValue={new Date(budget.date)}
                extraStyle="!w-full"
                callback={handleSetDate}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label>Category</label>
              <Combobox
                title="Icons"
                options={selectableCategories}
                extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
                callback={handleSetCategory}
                defaultValue={budget.category.name.toLowerCase()}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <CustomButton
              loading={isLoading}
              loadingTitle="Editing..."
              title="Edit Budget"
              type="submit"
            />
            <CustomButton
              loading={isLoading}
              loadingTitle="Deleting..."
              title="Delete Budget"
              type="button"
              primary={false}
              onClick={handleDelete}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgetModal;
