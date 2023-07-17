import BudgetCategories from "@/components/BudgetCategories";
import LeftSideBar from "@/components/LeftSideBar";
import { getCategories } from "@/lib/getCategories";
import getCurrentUser from "@/lib/getCurrentUser";

export const metadata = {
  title: "Budget|Roll",
  description: "The dashboard for your account",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const categories = await getCategories(user?.id as string);
  return (
    <div className="min-h-screen flex items-start w-full bg-[#030711] text-textPrimary">
      <LeftSideBar />
      {children}
      <BudgetCategories categories={categories} user={user} />
    </div>
  );
}
