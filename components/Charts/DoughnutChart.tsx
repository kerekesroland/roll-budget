"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ICategory } from "@/models/Category";
import { CurrencyType } from "@prisma/client";
import { useTranslations } from "next-intl";

interface IDoughnutChartProps {
  data: Array<ICategory>;
  currencyType: CurrencyType;
  usdValue: string;
}

const DoughnutChart = ({
  data,
  currencyType,
  usdValue,
}: IDoughnutChartProps) => {
  const t = useTranslations("analytics");
  const labels = data.map((item) => item.name);
  const monthlyTotals = data.map((item) => {
    // Convert currentPerMonth to the selected currency type
    if (item.currencyType === currencyType) {
      return item.currentPerMonth; // If currency types match, use the currentPerMonth value as is
    } else if (currencyType === "USD") {
      // If the selected currency is USD, convert from HUF to USD
      return item.currentPerMonth / Number(usdValue);
    } else {
      // If the selected currency is HUF, convert from USD to HUF
      return item.currentPerMonth * Number(usdValue);
    }
  });

  return (
    <Doughnut
      className="min-h-[200px] w-full"
      data={{
        labels,
        datasets: [
          {
            data: monthlyTotals,
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

export default DoughnutChart;
