"use client";
import { IInputController } from "@/models/Inputs";

import { Combobox } from "./ComboBox";
import ErrorInputMessage from "./ErrorInputMessage";
import { useCallback } from "react";
import { CurrencyType } from "@prisma/client";

const NumberController = ({
  label,
  error,
  register,
  placeholder,
  defaultName,
  extraStyle,
  extraContainerStyle,
  valuta,
  valutaOptions,
  setValuta,
  defaultValutaValue,
}: IInputController) => {
  const handleSetValuta = useCallback(
    (valuta: CurrencyType) => {
      if (setValuta) {
        setValuta(valuta);
      }
    },
    [setValuta]
  );

  return (
    <div
      className={`flex flex-col w-full max-w-[350px] py-4 ${extraContainerStyle}`}
    >
      <label className="text-textPrimary">{label}</label>
      <div className="w-full flex items-center h-[60px]">
        <input
          className={`bg-[#010808] text-textPrimary border-[#1C293A] border-2 py-4 px-5 w-full outline-none rounded-[5px] ${extraStyle}`}
          {...register}
          type="number"
          step="any"
          minLength={4}
          placeholder={placeholder || defaultName}
          required
        />
        {valuta && (
          <Combobox
            title={defaultValutaValue ?? "HUF"}
            options={valutaOptions}
            defaultValue={defaultValutaValue}
            callback={handleSetValuta}
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
