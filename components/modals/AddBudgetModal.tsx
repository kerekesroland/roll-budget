"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { BudgetOptions } from '@/constants/BudgetOptions';
import { ValutaOptions } from '@/constants/ValutaOptions';
import { useSchemas } from '@/hooks/useSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Category } from '@prisma/client';

import { Combobox } from '../ComboBox';
import CustomButton from '../CustomButton';
import { DatePickerForm } from '../CustomCalendar';
import GeneralHeader from '../GeneralHeader';
import InputController from '../InputController';
import NumberController from '../NumberController';

interface ICategory {
  name: string;
  price: number;
  category: string;
  date: Date;
  type: string;
}

interface IAddBudgetModal {
  toggleState: (value: boolean) => void;
  userId: string;
  categories: Category[];
}

const AddBudgetModal = ({
  userId,
  toggleState,
  categories,
}: IAddBudgetModal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const selectableCategories = categories?.map((category) => {
    return {
      label: category?.name,
      value: category?.name.toLowerCase(),
      id: category?.id,
    };
  });

  const { budgetSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: yupResolver(budgetSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await axios.post("/api/budget", {
        ...data,
        userId: userId,
      });
      toast.success(`Succesfully added added ${data.name} to the budgets!`);
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDate = (date: Date) => {
    setValue("date", date);
  };

  const handleSetCategory = (data: string) => {
    const selectedCategoryId = selectableCategories.find(
      (c) => c.value === data
    );
    if (selectedCategoryId) {
      setValue("category", selectedCategoryId.id);
    }
  };

  const handleSelectType = (data: string) => {
    setValue("type", data);
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] max-h-[600px] 2xl:max-h-none overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 rounded-2xl p-8 sm:p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Add Budget"
          subtitle="Fill out the information to add a budget!"
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
            extraStyle="!max-w-full"
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
            extraStyle="border-r-0 rounded-tr-none rounded-br-none w-full"
            extraContainerStyle="max-w-full"
          />

          <div className="py-8">
            <label>Type</label>
            <Combobox
              title="Type"
              options={BudgetOptions.types}
              extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
              callback={handleSelectType}
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="py-8 w-1/2">
              <label>Date</label>
              <DatePickerForm extraStyle="!w-full" callback={handleSetDate} />
            </div>

            <div className="flex flex-col w-1/2">
              <label>Category</label>
              <Combobox
                title="Icons"
                options={selectableCategories}
                extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
                callback={handleSetCategory}
              />
            </div>
          </div>

          <CustomButton
            loading={isLoading}
            loadingTitle="Creating..."
            title="Add Budget"
            type="submit"
            extraStyle="max-w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
