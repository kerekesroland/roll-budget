"use client";
import React, { useMemo, useState } from "react";
import MobileNavbar from "../MobileNavbar";
import { useTranslations } from "next-intl";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import DoughnutChart from "../Charts/DoughnutChart";
import DashboardChart from "../Charts/DashboardChart";
import { Chart, registerables } from "chart.js";
import { Combobox } from "../ComboBox";
import { CurrencyType } from "@prisma/client";
import useCurrencyConverter from "@/hooks/useCurrencyConverter";
import { IBudget } from "@/models/Budget";
import { ICategory } from "@/models/Category";
import { mapDateToMonth } from "@/lib/utils";
Chart.register(...registerables);

interface IProps {
  budgets: Array<IBudget> | null;
  allExceededCategories: Array<ICategory>;
}

const AnalyticsContent = ({ budgets, allExceededCategories }: IProps) => {
  const t = useTranslations("analytics");
  const { value: usdValue } = useCurrencyConverter("USD", "HUF");
  const [currency, setCurrency] = useState<CurrencyType>("HUF");

  const handleSetCurrency = (value: CurrencyType) => {
    setCurrency(value);
  };

  const topBudgets = useMemo(() => {
    return budgets
      ?.filter(
        (budget) =>
          budget?.type !== "income" &&
          mapDateToMonth(new Date(budget?.date as string)) ===
            mapDateToMonth(new Date())
      )
      ?.sort((a, b) => b.price - a.price);
  }, [budgets]);

  return (
    <div className="min-h-screen overflow-visible xs:p-4 md:py-8 lg:py-12 w-full">
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div className="flex flex-col xs:flex-row items-center justify-between gap-8">
        <h2 className="font-semibold text-2xl w-full text-left">
          {t("title")}
        </h2>
        <Combobox
          title={t("currency")}
          options={[
            {
              value: "usd",
              label: "USD",
            },
            {
              value: "huf",
              label: "HUF",
            },
          ]}
          callback={handleSetCurrency}
          defaultValue={currency}
          extraStyle="w-full lg:w-[200px]"
          searchable={false}
        />
      </div>
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-9 mt-16">
        <div>
          <h3 className="text-xl font-semibold mb-2">{t("income_expense")}</h3>
          <DashboardChart
            data={budgets ?? []}
            currencyType={currency.toUpperCase() as CurrencyType}
            usdValue={usdValue}
          />
        </div>
        <div>
          <h5 className="text-xl font-semibold mb-2">{t("budget_vs_limit")}</h5>
          <BarChart
            data={allExceededCategories ?? []}
            currencyType={currency.toUpperCase() as CurrencyType}
            usdValue={usdValue}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {t("biggest_expenses")}
          </h3>
          <PieChart
            data={topBudgets ?? []}
            currencyType={currency.toUpperCase() as CurrencyType}
            usdValue={usdValue}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            {t("biggest_categories")}
          </h3>
          <DoughnutChart
            data={allExceededCategories}
            currencyType={currency.toUpperCase() as CurrencyType}
            usdValue={usdValue}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;
