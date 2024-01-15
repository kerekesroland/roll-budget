"use client";
import { CategoryIcons } from "@/constants/CategoryIcons";
import { IIconSelector } from "@/models/Inputs";

import { CustomSelector } from "./CustomSelector";
import ErrorInputMessage from "./ErrorInputMessage";

const IconSelector = ({
  label,
  error,
  setValue,
  defaultValue,
  extraStyle,
  placeHolder,
}: IIconSelector) => {
  return (
    <div className={`flex flex-col w-full max-w-[350px] py-4 ${extraStyle}`}>
      <label className="text-textPrimary">{label}</label>
      <CustomSelector
        placeholder={placeHolder ?? ""}
        title="Icons"
        options={CategoryIcons}
        setValue={setValue}
        defaultValue={defaultValue}
      />
      <ErrorInputMessage error={error} />
    </div>
  );
};

export default IconSelector;
