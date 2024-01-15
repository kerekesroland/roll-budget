import { LocaleOptionsType } from "./locales";

export type LocaleTranslations = {
  en: string;
  hu: string;
  // Add translations for other languages as needed
};

type Option = {
  label: LocaleTranslations | string;
  value: string;
};

type BudgetOptions = {
  sortBy: Option[];
  types: Option[];
  price: Option[];
};

export const BudgetOptions = {
  sortBy: [
    {
      label: "ASC",
      value: "asc",
    },

    {
      label: "DESC",
      value: "desc",
    },
  ],
  types: [
    {
      label: "Income",
      value: "income",
    },
    {
      label: "Expense",
      value: "expense",
    },
  ],
  price: [
    {
      label: "Low",
      value: "low",
    },
    {
      label: "High",
      value: "high",
    },
  ],
};

const translations: BudgetOptions = {
  sortBy: [
    {
      label: {
        en: "ASC",
        hu: "NÖVEKVO",
      },
      value: "asc",
    },
    {
      label: {
        en: "DESC",
        hu: "CSÖKKENŐ",
      },
      value: "desc",
    },
  ],
  types: [
    {
      label: {
        en: "Income",
        hu: "Bevétel",
      },
      value: "income",
    },
    {
      label: {
        en: "Expense",
        hu: "Kiadás",
      },
      value: "expense",
    },
  ],
  price: [
    {
      label: {
        en: "Low",
        hu: "Alacsony",
      },
      value: "low",
    },
    {
      label: {
        en: "High",
        hu: "Magas",
      },
      value: "high",
    },
  ],
};

// Function to get the translated label based on the current locale
const getTranslatedLabel = (
  labelObject: LocaleTranslations | string,
  locale: LocaleOptionsType
): string => {
  if (typeof labelObject === "string") {
    return labelObject;
  }
  return labelObject[locale] || labelObject.en;
};

// Function to translate the entire `BudgetOptions` object
export const translateBudgetOptions = (
  locale: LocaleOptionsType
): BudgetOptions => {
  return {
    sortBy: translations?.sortBy?.map((option) => ({
      ...option,
      label: getTranslatedLabel(option?.label, locale),
    })),
    types: translations?.types?.map((option) => ({
      ...option,
      label: getTranslatedLabel(option?.label, locale),
    })),
    price: translations?.price?.map((option) => ({
      ...option,
      label: getTranslatedLabel(option?.label, locale),
    })),
  };
};
