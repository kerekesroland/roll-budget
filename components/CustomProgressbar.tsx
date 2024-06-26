"use client";
import { useTranslations } from "next-intl";
import { Progress } from "./ui/progress";

type Props = {
  name: string;
  value: number;
  color?: string;
};

const CustomProgressbar = ({ name, value, color }: Props) => {
  const t = useTranslations("dashboard");
  return (
    <div>
      <h4 className="text-lg font-medium">{name}</h4>
      <Progress
        value={value}
        className={`border-2 border-red-500 ${
          color ? `bg-[#${color}]` : "bg-red-400"
        }`}
      />
      <h4 className="mt-4 text-md font-medium text-[#79889D]/50 text-right">
        {t("financial_info.amount")}: {value} HUF
      </h4>
    </div>
  );
};

export default CustomProgressbar;
