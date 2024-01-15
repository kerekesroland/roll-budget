import "../globals.css";

import { Montserrat } from "next/font/google";

import Providers from "@/components/Providers";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale as setRequestLocale } from "next-intl/server";
import { LocaleOptionsType, localeOptions } from "@/constants/locales";
import { useMessages, useTimeZone } from "next-intl";
import { Timezone } from "node-schedule";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";

interface ILayoutProps {
  children: React.ReactNode;
  params: {
    locale: LocaleOptionsType;
  };
}

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Roll Budget",
  description: "Manage your finances effortlessly",
};

export default function RootLayout({
  children,
  params: { locale },
}: ILayoutProps) {
  const messages = useMessages();
  const timeZone = useTimeZone();

  // Validate that the incoming `locale` parameter is valid
  if (!localeOptions.includes(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${montserrat.className} min-h-screen w-full bg-[#1C293A]`}
      >
        <Providers
          locale={locale}
          messages={messages}
          timeZone={timeZone as Timezone}
        >
          {children}
          <LanguageSelector />
        </Providers>
      </body>
    </html>
  );
}
