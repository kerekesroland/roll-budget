import LeftSideBar from "@/components/LeftSideBar";
import MobileNavbar from "@/components/MobileNavbar";

export const metadata = {
  title: "Imvites|Roll",
  description: "The Invite menu to invite members",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-[#030711] text-textPrimary">
      <LeftSideBar />
      <MobileNavbar />
      {children}
    </div>
  );
}
