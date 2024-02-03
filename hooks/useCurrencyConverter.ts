"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export type TCurrencies = "USD" | "HUF";

interface IResponseProps {
  [key: string]: {
    [property: string]: string;
  };
}

const useCurrencyConverter = (
  fromCurrency: TCurrencies,
  toCurrency: TCurrencies
) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const currencyRequest = async () => {
      try {
        const res: AxiosResponse<IResponseProps> = await axios.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency.toLowerCase()}.json`
        );
        setValue(res.data.usd[`${toCurrency.toLowerCase()}`]);
      } catch (error) {
        console.log(error);
      }
    };
    currencyRequest();
  }, [fromCurrency, toCurrency]);

  return {
    value,
  };
};

export default useCurrencyConverter;
