import LeftSideBar from '@/components/LeftSideBar';

export const metadata = {
  title: "Budget|Roll",
  description: "Manage your budget here",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start w-full bg-[#030711] text-textPrimary">
      <LeftSideBar />
      {children}
    </div>
  );
}
