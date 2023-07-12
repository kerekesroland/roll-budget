import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Data",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 1000) - 0);
};

const data = {
  labels: labels,
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

const DashboardChart = () => {
  return (
    <Line
      className="min-h-[200px] w-full"
      data={data}
      options={options as any}
    />
  );
};

export default DashboardChart;
