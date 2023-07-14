import LeftSideBar from "@/components/LeftSideBar";
import MobileNavbar from "@/components/MobileNavbar";

export const metadata = {
  title: "Budget|Roll",
  description: "The dashboard for your account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center w-full bg-[#030711] text-textPrimary">
      <LeftSideBar />
      <MobileNavbar />
      {children}
    </div>
  );
}
