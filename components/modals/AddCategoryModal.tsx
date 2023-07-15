"use client";
import { useState } from "react";
import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import InputController from "../InputController";
import NumberController from "../NumberController";
import { ValutaOptions } from "@/constants/ValutaOptions";
import IconSelector from "../IconSelector";

const AddCategoryModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
        <InputController
          label="Name"
          isTouched={false}
          error={""}
          register={undefined}
          placeholder={""}
          value={""}
        />
        <NumberController
          label="Price"
          isTouched={false}
          type="number"
          error={""}
          register={undefined}
          placeholder={""}
          value={""}
          valuta
          valutaOptions={ValutaOptions}
          extraStyle="border-r-0 rounded-tr-none rounded-br-none"
        />
        <IconSelector />
        <CustomButton
          loading={isLoading}
          loadingTitle="Creating..."
          title="Add Category"
          type="submit"
        />
      </div>
    </div>
  );
};

export default AddCategoryModal;
