export const metadata = {
  title: "Accept Invite|Roll",
  description: "The dashboard for managing the invitations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-[#1c293a] text-textPrimary">
      {children}
    </div>
  );
}
