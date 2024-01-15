"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import DashboardChart from "@/components/Charts/DashboardChart";
import CustomProgressbar from "@/components/CustomProgressbar";
import MobileNavbar from "@/components/MobileNavbar";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrencyConverter, {
  TCurrencies,
} from "@/hooks/useCurrencyConverter";
import { formatePrice, mapDateToMonth } from "@/lib/utils";
import { IBudget } from "@/models/Budget";
import { ICategory } from "@/models/Category";

import Reveal from "../Reveal";
import DashboardItemCard from "./DashboardItemCard";
import { useTranslations } from "next-intl";

interface IProps {
  allExceededCategories: Array<ICategory>;
  categories: Array<ICategory> | null;
  allIncome: IBudget[] | null;
  budgets: Array<IBudget> | null;
}

interface ICurrency {
  type: TCurrencies;
  value: number;
}

const DashboardContent = ({
  allExceededCategories,
  allIncome,
  budgets,
  categories,
}: IProps) => {
  const t = useTranslations("dashboard");
  const containerRef = useRef<HTMLDivElement>(null);

  const totalIncome =
    useMemo(
      () => allIncome?.reduce((acc, curr) => (acc += curr?.price), 0),
      [allIncome]
    ) ?? 0;
  const totalExpense =
    useMemo(
      () =>
        budgets
          ?.filter((el) => el?.type !== "income")
          ?.reduce((acc, curr) => (acc += curr?.price), 0),
      [budgets]
    ) ?? 0;

  const topBudgets = budgets
    ?.filter(
      (budget) =>
        budget?.type !== "income" &&
        mapDateToMonth(new Date(budget?.date as string)) ===
          mapDateToMonth(new Date())
    )
    ?.sort((a, b) => b.price - a.price)
    .slice(0, 4);

  const totalBalance = totalIncome - totalExpense;

  const totalMonthlyIncome =
    useMemo(() => {
      const date = new Date();

      return budgets
        ?.filter(
          (budget) =>
            new Date(budget.date).getMonth() === date.getMonth() &&
            budget?.type === "income"
        )
        .reduce((acc, curr) => (acc += curr?.price), 0);
    }, [budgets]) ?? 0;

  const totalMonthlyExpense =
    useMemo(() => {
      const date = new Date();

      return budgets
        ?.filter(
          (budget) =>
            new Date(budget.date).getMonth() === date.getMonth() &&
            budget?.type === "expense"
        )
        .reduce((acc, curr) => (acc += curr?.price), 0);
    }, [budgets]) ?? 0;

  const isPositiveMonth =
    totalMonthlyIncome - totalMonthlyExpense > 0 ? true : false;

  const PROGRESS = allExceededCategories?.map((cat) => {
    return {
      name: cat?.name,
      spent: cat?.currentPerMonth,
    };
  });

  const FINANCES = [
    {
      name: t("financial_info.total_income"),
      amount: totalMonthlyIncome,
      color: "text-green-500",
    },
    {
      name: t("financial_info.total_expense"),
      amount: totalMonthlyExpense,
      color: "text-red-500",
    },
    {
      name: t("financial_info.balance"),
      amount: totalMonthlyIncome - totalMonthlyExpense,
      color: isPositiveMonth ? "text-green-500" : "text-red-500",
    },
  ];

  const { value: usdValue } = useCurrencyConverter("USD", "HUF");

  const [currency, setCurrency] = useState<ICurrency>({
    type: "HUF",
    value: totalBalance,
  });

  const toggleCurrencies = useCallback(() => {
    currency.type === "HUF"
      ? setCurrency((prevCurrency) => ({
          ...prevCurrency,
          type: "USD",
          value: totalBalance / Number(usdValue),
        }))
      : setCurrency((prevCurrency) => ({
          ...prevCurrency,
          type: "HUF",
          value: totalBalance,
        }));
  }, [currency, totalBalance, usdValue]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Check if the content overflows and apply pr-4 class
      if (container.scrollHeight > container.clientHeight) {
        container.classList.add("pr-4");
      } else {
        container.classList.remove("pr-4");
      }
    }
  }, [PROGRESS]);

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const sideInfoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: custom * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="min-h-screen overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">{t("title")}</h2>
        <MobileNavbar />
      </div>
      <div className="w-full mt-8 rounded-[10px] gap-16 flex flex-col 2xl:flex-row justify-between items-start ">
        <div className="flex flex-col w-full 2xl:w-2/3 ">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-auto lg:h-[200px] flex flex-row items-center justify-between gap-8 px-8 py-4 bg-[#1C293A] rounded-[15px]"
          >
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row w-full items-center justify-center lg:justify-start gap-8 lg:gap-16">
              <div className="flex flex-col gap-4">
                <Reveal delay={0.8}>
                  <h3 className="text-xl font-semibold text-textPrimary/70">
                    {t("balance")}
                  </h3>
                </Reveal>
                <Reveal delay={1}>
                  <span className="text-3xl font-semibold">{`${formatePrice(
                    currency?.value ?? 0
                  )} ${currency?.type}`}</span>
                </Reveal>
                <Reveal delay={1.2}>
                  <span className="cursor-pointer" onClick={toggleCurrencies}>
                    {t("show_balance_in_usd")}{" "}
                    <b className="text-green-500 font-semibold">USD</b>
                  </span>
                </Reveal>
              </div>
            </div>
            <Image
              className="hidden xl:block"
              src={"/images/BalanceUp.svg"}
              alt="profile"
              width="250"
              height="125"
            />
          </motion.section>
          <section className="mt-8 flex flex-wrap gap-4 items-center justify-between s:justify-center md:justify-between">
            {topBudgets?.map((item: IBudget, idx: number) => (
              <Suspense
                key={item.id}
                fallback={
                  <Skeleton
                    key={item.id}
                    className="h-[161px] s:h-[251px] s:w-[290px] md:h-[161px] md:w-[180px] xl:h-[171px] xl:w-[200px] rounded-[15px]"
                  />
                }
              >
                <motion.div
                  key={item.id}
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                >
                  <DashboardItemCard categories={categories ?? []} {...item} />
                </motion.div>
              </Suspense>
            ))}
          </section>
          <section className="flex w-full mt-8">
            <DashboardChart data={budgets ?? []} />
          </section>
        </div>
        <motion.section
          variants={sideInfoVariants}
          initial="hidden"
          animate="visible"
          className="h-auto w-full 2xl:w-1/3 flex flex-col xl:flex-row 2xl:flex-col xl:gap-16 2xl:gap-0 justify-start bg-[#1C293A] p-8 rounded-[10px]"
        >
          <div
            ref={containerRef}
            className="w-full overflow-y-auto max-h-[calc(100vh-350px)] scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 pr-4"
          >
            <h3 className="text-2xl font-semibold text-textPrimary mb-8">
              {t("exceeded_budgets")}
            </h3>
            <div className="flex flex-col gap-8 w-full">
              {PROGRESS.length === 0 ? (
                <span className="text-lg text-center font-semibold text-blue-400">
                  {t("no_exceeded_budgets")} 👍🏼
                </span>
              ) : (
                PROGRESS?.map((progress) => (
                  <CustomProgressbar
                    name={progress.name}
                    value={progress.spent}
                    key={progress.name}
                  />
                ))
              )}
            </div>
          </div>
          <section className="w-full">
            <h3 className="text-2xl font-semibold text-textPrimary my-8 2xl:mb-8 xl:mt-0 2xl:my-8">
              {t("financial_info.title")}
            </h3>
            <div className="flex flex-col gap-8 w-full">
              {FINANCES.map((fn) => (
                <div
                  key={fn.name}
                  className="flex justify-between items-center gap-4"
                >
                  <span className="text-lg font-medium">{fn.name}</span>
                  <span
                    className={`text-xl text-right font-medium ${fn.color}`}
                  >
                    {fn.amount} HUF
                  </span>
                </div>
              ))}
            </div>
          </section>
        </motion.section>
      </div>
    </div>
  );
};

export default DashboardContent;
