import CustomProgressbar from "@/components/CustomProgressbar";
import DashboardItemCard from "@/components/DashboardItemCard";
import Image from "next/image";

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
  return (
    <div className="min-h-screen py-12 w-[calc(100%-364px)] pr-16">
      <h2 className="font-semibold text-2xl">Dashboard</h2>
      <div className="h-full w-full mt-8 rounded-[10px] gap-16 flex flex-col 3xl:flex-row justify-between items-start ">
        <div className="flex flex-col w-full 3xl:w-2/3 ">
          <div className="h-[200px] flex items-center justify-between gap-8 px-8 py-4 bg-[#1C293A] rounded-[15px]">
            <div className="flex w-full items-center gap-16">
              <Image
                src={"/images/profile.jpeg"}
                alt="profile"
                width="125"
                height="125"
                className="rounded-full"
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
              src={"/images/BalanceUp.svg"}
              alt="profile"
              width="250"
              height="125"
            />
          </div>
          <div className="mt-8 flex items-center justify-between">
            {DASHBOARD_ITEMS.map((item) => (
              <DashboardItemCard key={item.name} {...item} />
            ))}
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-col bg-[#1C293A] p-8 rounded-[10px]">
          <h3 className="text-2xl font-semibold text-textPrimary mb-8">
            Exceeded Budgets
          </h3>
          <div className="flex flex-col gap-8">
            {FAKE_PROGRESS.map((progress) => (
              <CustomProgressbar
                name={progress.name}
                value={progress.spent}
                key={progress.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
