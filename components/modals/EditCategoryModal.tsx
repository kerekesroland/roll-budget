"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ValutaOptions } from "@/constants/ValutaOptions";
import { useSchemas } from "@/hooks/useSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import IconSelector from "../IconSelector";
import InputController from "../InputController";
import NumberController from "../NumberController";

interface ICategory {
  id: string;
  name: string;
  limit: number;
  icon: string;
}

interface ICategoryWithoutId extends Omit<ICategory, "id"> {}

interface IEditCategoryModal {
  toggleState: (value: boolean) => void;
  userId: string;
  category: ICategory;
}

const EditCategoryModal = ({
  userId,
  toggleState,
  category,
}: IEditCategoryModal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { categorySchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICategoryWithoutId>({
    resolver: yupResolver(categorySchema),
    reValidateMode: "onChange",
    mode: "onChange",
    values: category,
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ICategoryWithoutId> = async (data) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/category/${category.id}`, data);
      toast.success(`Successfully modified category!`);
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/category/${category.id}`);
      router.refresh();
      toast.success("Category deleted successfully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [category.id, router]);

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Edit Category"
          subtitle="Fill out the information to add a category!"
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label="Name"
            isTouched={false}
            error={errors.name?.message as string}
            register={register("name")}
            placeholder={"Shopping"}
            value={""}
            extraStyle="max-w-full"
          />
          <NumberController
            label="Limit"
            isTouched={false}
            type="number"
            error={errors.limit?.message as string}
            register={register("limit")}
            placeholder={"2500"}
            value={""}
            valuta
            valutaOptions={ValutaOptions}
            extraStyle="border-r-0 rounded-tr-none rounded-br-none"
            extraContainerStyle="max-w-full"
          />
          <IconSelector
            label="Icon"
            error={errors.icon?.message as string}
            register={register("icon")}
            setValue={setValue}
            defaultValue={category?.icon}
            extraStyle="max-w-full"
          />
          <div className="flex items-center gap-4">
            <CustomButton
              loading={isLoading}
              loadingTitle="Creating..."
              title="Edit Category"
              type="submit"
            />
            <CustomButton
              onClick={handleDelete}
              loading={isLoading}
              loadingTitle="Deleting..."
              title="Delete Category"
              type="button"
              primary={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
