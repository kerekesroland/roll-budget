"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { IBudget } from "@/models/Budget";
import { CurrencyType } from "@prisma/client";
import { useTranslations } from "next-intl";
Chart.register(...registerables);

interface IPieChartProps {
  data: Array<IBudget>;
  currencyType: CurrencyType;
  usdValue: string;
}

const PieChart = ({ data, currencyType, usdValue }: IPieChartProps) => {
  const t = useTranslations("analytics");
  const labels = data.map((item) => item.name);
  const prices = data.map((item) => {
    // Convert prices to the selected currency type
    if (item.currencyType === currencyType) {
      return item.price; // If currency types match, use the price as is
    } else if (currencyType === "USD") {
      // If the selected currency is USD, convert from HUF to USD
      return item.price / Number(usdValue);
    } else {
      // If the selected currency is HUF, convert from USD to HUF
      return item.price * Number(usdValue);
    }
  });
  return (
    <Pie
      className="min-h-[200px] w-full"
      data={{
        labels,
        datasets: [
          {
            data: prices,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9C27B0",
            ], // Set background colors for each segment
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4CAF50",
              "#9C27B0",
            ], // Set hover background colors for each segment (optional)
          },
        ],
      }}
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

export default PieChart;
