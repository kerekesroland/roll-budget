import LeftSideBar from "@/components/LeftSideBar";
import MobileNavbar from "@/components/MobileNavbar";
import InviteModal from "@/components/modals/InviteModal";

export const metadata = {
  title: "Invites|Roll",
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
