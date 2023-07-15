"use client";
import { Combobox } from "./ComboBox";
import ErrorInputMessage from "./ErrorInputMessage";
import { IInputController } from "@/models/Inputs";

const NumberController = ({
  label,
  error,
  register,
  placeholder,
  defaultName,
  extraStyle,
  valuta,
  valutaOptions,
}: IInputController) => {
  return (
    <div className="flex flex-col w-full max-w-[350px] py-4">
      <label className="text-textPrimary">{label}</label>
      <div className="w-full flex items-center h-[60px]">
        <input
          className={`bg-[#010808] text-textPrimary border-[#1C293A] border-2 py-4 px-5 w-full outline-none rounded-[5px] ${extraStyle}`}
          {...register}
          type="number"
          minLength={4}
          placeholder={placeholder || defaultName}
          required
        />
        {valuta && (
          <Combobox
            title="HUF"
            options={valutaOptions}
            extraStyle="h-full border-[#1C293A] border-2 border-l-2 hover:bg-[#1C293A] hover:text-white rounded-tl-none rounded-bl-none"
          />
        )}
      </div>

      <style>
        {`
              input[type="number"]::-webkit-inner-spin-button,
              input[type="number"]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
            `}
      </style>

      <ErrorInputMessage error={error} />
    </div>
  );
};

export default NumberController;
