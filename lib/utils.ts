import { ClassValue, clsx, type } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Months = {
  [key: number]: string;
};

type PriceStyle = "decimal" | "currency" | "percent";

type TKeyToImage = {
  [key: string]: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function mapDateToMonth(date: Date) {
  const months: Months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const readableDate = date.getMonth() + 1;
  return months[readableDate];
}

export function formatePrice(
  price: number,
  style?: PriceStyle,
  decimals?: number
) {
  const options = {
    style: style ?? "decimal", // You can also use 'currency', 'percent', etc. depending on your needs
    minimumFractionDigits: decimals ?? 0, // Specify the number of decimal places
    maximumFractionDigits: decimals ?? 0, // Specify the number of decimal places
  };

  return price.toLocaleString("de-DE", options);
}

export const keyToImage: TKeyToImage = {
  shopping: "/images/Shopping.svg",
  education: "/images/Education.svg",
  money: "/images/Money.svg",
  utility: "/images/Utility.svg",
};
