"use client";
import { IInputController } from "@/models/Inputs";

import ErrorInputMessage from "./ErrorInputMessage";

const InputController = ({
  label,
  type,
  error,
  register,
  placeholder,
  defaultName,
  extraStyle,
}: IInputController) => {
  return (
    <div className={`flex flex-col w-full max-w-[350px] py-4 ${extraStyle}`}>
      <label className="text-textPrimary">{label}</label>
      <input
        className="bg-[#010808] text-textPrimary border-[#1C293A] border-2 py-4 px-5 w-full outline-none rounded-[5px]"
        {...register}
        type={type}
        minLength={4}
        placeholder={placeholder || defaultName}
        required
      />
      <ErrorInputMessage error={error} />
    </div>
  );
};

export default InputController;
