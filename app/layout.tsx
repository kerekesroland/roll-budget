import './globals.css';

import { Montserrat } from 'next/font/google';

import Providers from '@/components/Providers';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Roll Budget",
  description: "Manage your finances effortlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} min-h-screen w-full bg-[#1C293A]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
