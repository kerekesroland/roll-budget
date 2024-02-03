"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { translateBudgetOptions } from "@/constants/BudgetOptions";
import { ValutaOptions } from "@/constants/ValutaOptions";
import { useSchemas } from "@/hooks/useSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Category, CurrencyType } from "@prisma/client";

import { Combobox } from "../ComboBox";
import CustomButton from "../CustomButton";
import { DatePickerForm } from "../CustomCalendar";
import GeneralHeader from "../GeneralHeader";
import InputController from "../InputController";
import NumberController from "../NumberController";
import { useLocale, useTranslations } from "next-intl";
import { LocaleOptionsType } from "@/constants/locales";

interface IBudget {
  name: string;
  price: number;
  category: string;
  date: Date;
  type: string;
  currencyType: any;
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
  const t = useTranslations("budgets");
  const locale = useLocale() as LocaleOptionsType;
  const BudgetOptions2 = translateBudgetOptions(locale);

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
  } = useForm<IBudget>({
    resolver: yupResolver(budgetSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IBudget> = async (data) => {
    const typeConverter = () => {
      let type = data.type;
      if (type === "bevétel" || type === "income") {
        type = "income";
      } else {
        type = "expense";
      }
      return type;
    };

    try {
      setIsLoading(true);
      await axios.post("/api/budget", {
        ...data,
        userId: userId,
        createdAt: data.date,
        updatedAt: data.date,
        type: typeConverter(),
      });
      toast.success(t("add_budget.toast_messages.add_success"));
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      if (error.response.data.type === "currencyMismatch") {
        toast.error(t("add_budget.toast_messages.currency_mismatch"));
      } else {
        toast.error(t("add_budget.toast_messages.add_error"));
      }
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

  const handleSetValuta = (value: CurrencyType) => {
    setValue("currencyType", value.toUpperCase());
  };

  console.log(errors);

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] max-h-[600px] 2xl:max-h-none overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 rounded-2xl p-8 sm:p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title={t("add_budget.title")}
          subtitle={t("add_budget.subTitle")}
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label={t("add_budget.name")}
            isTouched={false}
            error={errors.name?.message as string}
            register={register("name")}
            placeholder={"Groceries"}
            value={""}
            extraStyle="!max-w-full"
          />
          <NumberController
            label={t("add_budget.price")}
            isTouched={false}
            type="number"
            error={errors.price?.message as string}
            register={register("price")}
            placeholder={"40000"}
            value={""}
            valuta
            setValuta={handleSetValuta}
            valutaOptions={ValutaOptions}
            extraStyle="border-r-0 rounded-tr-none rounded-br-none w-full"
            extraContainerStyle="max-w-full"
          />

          <div className="py-8">
            <label>{t("add_budget.type")}</label>
            <Combobox
              title={t("add_budget.type")}
              options={BudgetOptions2.types}
              extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
              callback={handleSelectType}
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="py-8 w-1/2">
              <label>{t("add_budget.date")}</label>
              <DatePickerForm extraStyle="!w-full" callback={handleSetDate} />
            </div>

            <div className="flex flex-col w-1/2">
              <label>{t("add_budget.category")}</label>
              <Combobox
                title={t("add_budget.icons")}
                options={selectableCategories}
                extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full"
                callback={handleSetCategory}
              />
            </div>
          </div>

          <CustomButton
            loading={isLoading}
            loadingTitle={t("add_budget.btn_loading")}
            title={t("add_budget.add_btn")}
            type="submit"
            extraStyle="max-w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
