import LeftSideBar from "@/components/LeftSideBar";

export const metadata = {
  title: "Reminders|Roll",
  description: "The Reminders menu to make scheduled notifications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-[#030711] text-textPrimary">
      <LeftSideBar />
      {children}
    </div>
  );
}
