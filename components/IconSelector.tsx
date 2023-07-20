"use client";
import { CategoryIcons } from "@/constants/CategoryIcons";
import { CustomSelector } from "./CustomSelector";
import ErrorInputMessage from "./ErrorInputMessage";
import { IIconSelector } from "@/models/Inputs";

const IconSelector = ({
  label,
  error,
  setValue,
  defaultValue,
  extraStyle,
}: IIconSelector) => {
  return (
    <div className={`flex flex-col w-full max-w-[350px] py-4 ${extraStyle}`}>
      <label className="text-textPrimary">{label}</label>
      <CustomSelector
        placeholder="Select an Icon"
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
