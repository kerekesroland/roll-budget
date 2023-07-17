"use client";

type Props = {
  date?: Date;
  numberOfTransactions: number;
  value: number;
};

const BudgetInfo = ({ numberOfTransactions, value }: Props) => {
  return (
    <div className="py-12 flex items-center justify-between">
      <span className="text-lg font-medium">{"17/07/2023"}</span>
      <div className="flex items-center gap-8">
        <span className="text-[#79889D] text-lg font-medium">
          Number of transactions: {numberOfTransactions}
        </span>
        <span className="text-[#79889D] text-lg font-medium">
          Value: {value}
        </span>
      </div>
    </div>
  );
};

export default BudgetInfo;