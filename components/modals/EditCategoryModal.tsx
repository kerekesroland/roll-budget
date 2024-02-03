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
import { useTranslations } from "next-intl";
import { CurrencyType } from "@prisma/client";

interface ICategory {
  id: string;
  name: string;
  limit: number;
  icon: string;
  currencyType: any;
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
  const t = useTranslations("categories.edit_category");
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

  const handleSetValuta = (value: CurrencyType) => {
    setValue("currencyType", value.toUpperCase());
  };

  const onSubmit: SubmitHandler<ICategoryWithoutId> = async (data) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/category/${category.id}`, data);
      toast.success(t("toast_messages.edit_success"));
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(t("toast_messages.edit_error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/category/${category.id}`);
      router.refresh();
      toast.success(t("toast_messages.delete_success"));
    } catch (error: any) {
      toast.error(t("toast_messages.delete_error"));
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
          title={t("title")}
          subtitle={t("subTitle")}
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label={t("name")}
            isTouched={false}
            error={errors.name?.message as string}
            register={register("name")}
            placeholder={"Shopping"}
            value={""}
            extraStyle="max-w-full"
          />
          <NumberController
            label={t("limit")}
            isTouched={false}
            type="number"
            error={errors.limit?.message as string}
            register={register("limit")}
            placeholder={"2500"}
            value={""}
            valuta
            defaultValutaValue={category?.currencyType}
            setValuta={handleSetValuta}
            valutaOptions={ValutaOptions}
            extraStyle="border-r-0 rounded-tr-none rounded-br-none"
            extraContainerStyle="max-w-full"
          />
          <IconSelector
            label={t("icon")}
            error={errors.icon?.message as string}
            register={register("icon")}
            setValue={setValue}
            defaultValue={category?.icon}
            extraStyle="max-w-full"
          />
          <div className="flex items-center gap-4">
            <CustomButton
              loading={isLoading}
              loadingTitle={t("btn_loading")}
              title={t("edit_btn")}
              type="submit"
            />
            <CustomButton
              onClick={handleDelete}
              loading={isLoading}
              loadingTitle={t("btn_loading_delete")}
              title={t("delete_btn")}
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
