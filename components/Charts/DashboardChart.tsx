import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

interface IDashboardChartProps {
  data: Array<number>;
  labels: Array<string>;
}
Chart.register(...registerables);

const DashboardChart = ({ labels, data }: IDashboardChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Data (displayed in 1k units)",
      },
    },
  };

  //todo Make the labels dynamic by checking the the date's month with every budget date, then separate them by type and use it in the chart
  // First we need data like this
  // data = [
  //   {
  //     month: 'jan',
  //     value: 250000,
  //     type: 'income'
  //   },
  //   {
  //     month: 'jan',
  //     value: 50000,
  //     type: 'expense'
  //   }
  // ]

  const chartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const generateRandomData = () => {
    return chartLabels.map(() => Math.floor(Math.random() * 1000) - 0);
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Income",
        data: generateRandomData(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: generateRandomData(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
