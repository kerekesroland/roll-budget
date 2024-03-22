"use client";
import { ICategory } from "@/models/Category";
import { CurrencyType } from "@prisma/client";
import { useTranslations } from "next-intl";
import React from "react";
import { Bar } from "react-chartjs-2";

interface IBarChartProps {
  data: Array<ICategory>;
  currencyType: CurrencyType;
  usdValue: string;
}

const BarChart = ({ data, currencyType, usdValue }: IBarChartProps) => {
  const t = useTranslations("analytics");
  const labels = data.map((item) => item.name);
  const limits = data.map((item) => {
    // Convert the limit values based on the selected currency type
    if (item.currencyType === currencyType) {
      return item.limit; // If currency types match, use the limit as is
    } else if (currencyType === "USD") {
      // If the selected currency is USD, convert from HUF to USD
      return item.limit / Number(usdValue);
    } else {
      // If the selected currency is HUF, convert from USD to HUF
      return item.limit * Number(usdValue);
    }
  });

  const expenses = data.map((item) => {
    // Convert the expenses to match the currency type of the limits
    if (item.currencyType === currencyType) {
      return item.currentPerMonth; // If currency types match, use the expenses as is
    } else if (currencyType === "USD") {
      // If the selected currency is USD, convert from HUF to USD
      return item.currentPerMonth / Number(usdValue);
    } else {
      // If the selected currency is HUF, convert from USD to HUF
      return item.currentPerMonth * Number(usdValue);
    }
  });

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: t("budget_limit"),
        data: limits,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: t("current_expenses"),
        data: expenses,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Bar
      className="min-h-[200px] w-full"
      data={barChartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: t("monthly"),
          },
        },
      }}
    />
  );
};

export default BarChart;
