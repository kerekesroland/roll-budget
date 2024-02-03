"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  name: string;
  limit: number;
  icon: string;
  currencyType: any;
}

interface IAddCategoryModal {
  toggleState: (value: boolean) => void;
  userId: string;
}

const AddCategoryModal = ({ userId, toggleState }: IAddCategoryModal) => {
  const t = useTranslations("categories.add_category");
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
  } = useForm<ICategory>({
    resolver: yupResolver(categorySchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSetValuta = (value: CurrencyType) => {
    setValue("currencyType", value.toUpperCase());
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/category", { ...data, userId: userId });
      toast.success(t("toast_messages.add_success"));
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(t("toast_messages.add_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Add Category"
          subtitle="Fill out the information to add a category!"
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
            extraContainerStyle="max-w-full"
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
            setValuta={handleSetValuta}
            valutaOptions={ValutaOptions}
            extraStyle="border-r-0 rounded-tr-none rounded-br-none max-w-full"
            extraContainerStyle="max-w-full"
          />
          <IconSelector
            label={t("icon")}
            error={errors.icon?.message as string}
            register={register("icon")}
            setValue={setValue}
            extraStyle="max-w-full"
            placeHolder={t("select_icon")}
          />
          <CustomButton
            loading={isLoading}
            loadingTitle={t("btn_loading")}
            title={t("add_btn")}
            type="submit"
            extraStyle="max-w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
