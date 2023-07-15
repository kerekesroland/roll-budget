"use client";

import DashboardChart from "@/components/Charts/DashboardChart";
import CustomProgressbar from "@/components/CustomProgressbar";
import DashboardItemCard from "@/components/DashboardItemCard";
import MobileNavbar from "@/components/MobileNavbar";
import { Chart, registerables } from "chart.js";
import Image from "next/image";

Chart.register(...registerables);
const Dashboard = () => {
  const DASHBOARD_ITEMS = [
    {
      name: "Food",
      price: 85000,
      icon: "/images/Shopping.svg",
    },
    {
      name: "Rent",
      price: 65000,
      icon: "/images/Money.svg",
    },
    {
      name: "Starbucks",
      price: 47000,
      icon: "/images/Shopping.svg",
    },
    {
      name: "Finance Books",
      price: 23000,
      icon: "/images/Education.svg",
    },
  ];

  const FAKE_PROGRESS = [
    {
      name: "Food",
      spent: 1000000,
    },
    {
      name: "Travel",
      spent: 6000000,
    },
    {
      name: "Clothes",
      spent: 2000000,
    },
  ];

  const FAKE_FINANCIAL = [
    {
      name: "Total income",
      amount: 600000,
      color: "text-green-500",
    },
    {
      name: "Total expense",
      amount: 280000,
      color: "text-red-500",
    },
    {
      name: "Total balance",
      amount: 320000,
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Dashboard</h2>
        <MobileNavbar />
      </div>
      <div className="w-full mt-8 rounded-[10px] gap-16 flex flex-col 2xl:flex-row justify-between items-start ">
        <div className="flex flex-col w-full 2xl:w-2/3 ">
          <div className="h-auto lg:h-[200px] flex flex-row items-center justify-between gap-8 px-8 py-4 bg-[#1C293A] rounded-[15px]">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row w-full items-center justify-center lg:justify-start gap-8 lg:gap-16">
              <Image
                src={"/images/profile.jpeg"}
                alt="profile"
                width="125"
                height="125"
                quality={90}
                className="rounded-full !w-[200px] !h-[200px] lg:!w-[125px] lg:!h-[125px] object-cover"
              />
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-textPrimary/70">
                  My Balance
                </h3>
                <span className="text-3xl font-semibold">668.332 Ft</span>
                <span>
                  Show account balance in <b className="text-green-500">USD</b>
                </span>
              </div>
            </div>
            <Image
              className="hidden xl:block"
              src={"/images/BalanceUp.svg"}
              alt="profile"
              width="250"
              height="125"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4 items-center justify-between s:justify-center md:justify-between">
            {DASHBOARD_ITEMS.map((item) => (
              <DashboardItemCard key={item.name} {...item} />
            ))}
          </div>
          <div className="flex w-full mt-8">
            <DashboardChart />
          </div>
        </div>
        <div className="h-auto w-full 2xl:w-1/3 flex flex-col xl:flex-row 2xl:flex-col xl:gap-16 2xl:gap-0 justify-start bg-[#1C293A] p-8 rounded-[10px]">
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-textPrimary mb-8">
              Exceeded Budgets
            </h3>
            <div className="flex flex-col gap-8 w-full">
              {FAKE_PROGRESS.map((progress) => (
                <CustomProgressbar
                  name={progress.name}
                  value={progress.spent}
                  key={progress.name}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-textPrimary my-8 2xl:mb-8 xl:mt-0 2xl:my-8">
              Financial information
            </h3>
            <div className="flex flex-col gap-8 w-full">
              {FAKE_FINANCIAL.map((fn) => (
                <div
                  key={fn.name}
                  className="flex justify-between items-center"
                >
                  <span className="text-lg font-medium">{fn.name}</span>
                  <span className={`text-xl font-medium ${fn.color}`}>
                    {fn.amount} HUF
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
