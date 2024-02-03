import { Chart, registerables } from "chart.js";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";

import { IBudget } from "@/models/Budget";
import { useTranslations } from "use-intl";
import { CurrencyType } from "@prisma/client";

interface IDashboardChartProps {
  data: Array<IBudget>;
  currencyType: CurrencyType;
  usdValue: string;
}
Chart.register(...registerables);

const DashboardChart = ({
  data,
  currencyType,
  usdValue,
}: IDashboardChartProps) => {
  const t = useTranslations("dashboard");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("financial_info.monthly"),
      },
    },
  };

  const receivedData = useMemo(() => {
    const parsedData = data.map((entry) => ({
      date: new Date(entry.date),
      type: entry.type,
      price: entry.price,
      currencyType: entry.currencyType, // Assuming the data contains currencyType
    }));

    const monthlyTotals: any = {};

    parsedData.forEach((entry) => {
      const monthYear = entry.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = {
          income: 0,
          expense: 0,
        };
      }

      // Check if the currency types match
      const isSameCurrency = entry.currencyType === currencyType;

      // If currency types match, add the price directly to the corresponding accumulator
      if (entry.type === "income" && isSameCurrency) {
        monthlyTotals[monthYear].income += entry.price;
      } else if (entry.type === "expense" && isSameCurrency) {
        monthlyTotals[monthYear].expense += entry.price;
      } else if (currencyType === "HUF" && entry.currencyType === "USD") {
        // Assuming a fixed exchange rate for USD to HUF
        const exchangeRateUSDtoHUF = Number(usdValue); // Update with your actual exchange rate
        const convertedPrice = entry.price * exchangeRateUSDtoHUF;

        // Avoid negative or infinite values
        if (isFinite(convertedPrice)) {
          monthlyTotals[monthYear].income +=
            entry.type === "income" ? convertedPrice : 0;
          monthlyTotals[monthYear].expense +=
            entry.type === "expense" ? convertedPrice : 0;
        }
      } else if (currencyType === "USD" && entry.currencyType === "HUF") {
        // Assuming a fixed exchange rate for HUF to USD
        const exchangeRateHUFtoUSD = 1 / Number(usdValue); // Update with your actual exchange rate
        const convertedPrice = entry.price * exchangeRateHUFtoUSD;

        // Avoid negative or infinite values
        if (isFinite(convertedPrice)) {
          monthlyTotals[monthYear].income +=
            entry.type === "income" ? convertedPrice : 0;
          monthlyTotals[monthYear].expense +=
            entry.type === "expense" ? convertedPrice : 0;
        }
      }
    });

    const labels = Object.keys(monthlyTotals).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    const incomeData = labels.map((label) => monthlyTotals[label].income);
    const expenseData = labels.map((label) => monthlyTotals[label].expense);

    return {
      incomeData,
      expenseData,
      labels,
    };
  }, [data, usdValue, currencyType]);

  const { labels, incomeData, expenseData } = receivedData;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: t("financial_info.income"),
        data: incomeData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: t("financial_info.expense"),
        data: expenseData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Line
      className="min-h-[200px] w-full"
      data={chartData}
      options={options as any}
    />
  );
};

export default DashboardChart;
