"use client";
import { useState } from "react";
import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import InputController from "../InputController";
import NumberController from "../NumberController";
import { ValutaOptions } from "@/constants/ValutaOptions";
import IconSelector from "../IconSelector";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface ICategory {
  name: string;
  limit: number;
  icon: string;
}

interface IAddCategoryModal {
  toggleState: (value: boolean) => void;
  userId: string;
}

const AddCategoryModal = ({ userId, toggleState }: IAddCategoryModal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { categorySchema } = useAuthSchemas();
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

  const router = useRouter();

  const onSubmit: SubmitHandler<ICategory> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/category", { ...data, userId: userId });
      toast.success(`Succesfully added added ${data.name} to the categories!`);
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px]  w-[500px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Add Category"
          subtitle="Fill out the information to add a category!"
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputController
            label="Name"
            isTouched={false}
            error={errors.name?.message as string}
            register={register("name")}
            placeholder={"Shopping"}
            value={""}
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
          />
          <IconSelector
            label="Icon"
            error={errors.icon?.message as string}
            register={register("icon")}
            setValue={setValue}
          />
          <CustomButton
            loading={isLoading}
            loadingTitle="Creating..."
            title="Add Category"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
