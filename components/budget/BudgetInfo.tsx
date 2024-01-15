"use client";

import { useTranslations } from "next-intl";

type Props = {
  date?: string;
  numberOfTransactions: number;
  value: number;
};

const BudgetInfo = ({ numberOfTransactions, value, date }: Props) => {
  const t = useTranslations("budgets");

  return (
    <div className="py-12 flex flex-col s:flex-row items-start s:items-center justify-between gap-4 s:gap-0">
      <span className="text-lg font-medium">{date}</span>
      <div className="flex items-center gap-8">
        <span className="text-[#79889D] text-lg font-medium">
          {t("no_transactions")}: {numberOfTransactions}
        </span>
        <span className="text-[#79889D] text-lg font-medium">
          {t("value")}: {value}
        </span>
      </div>
    </div>
  );
};

export default BudgetInfo;
