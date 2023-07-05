import "./globals.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";

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
        <div className="min-h-screen w-full relative">
          <div className="absolute top-0 right-0 w-60 h-60 sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] 2xl:w-[800px] 2xl:h-[800px]">
            <Image
              src="/images/blob-right.svg"
              alt="Image 1"
              fill
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] 2xl:w-[800px] 2xl:h-[800px]">
            <Image
              src="/images/blob-left.svg"
              alt="Image 2"
              fill
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px"
            />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
