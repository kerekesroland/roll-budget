"use client";
import { LocaleOptionsType } from "@/constants/locales";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { LANGUAGES } from "./langugages";
import Image from "next/image";
import { Globe2 as Globe } from "lucide-react";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const rotateValue = isOpen ? "rotate-[135deg]" : "rotate-0";

  const calculateTranslation = (idx: number) => {
    const gap = -40; // Adjust this value to control the gap between options
    const translateY = -90 - idx * gap;
    const translateX = -80 * idx + 1;
    return { translateY, translateX };
  };

  const path = usePathname();

  //path excluding the locale
  const modifiedPath = path?.split("/")[2];

  const getHrefForLocales = (locale: LocaleOptionsType) => {
    if (modifiedPath) {
      return `/${locale}/${modifiedPath}`;
    } else {
      return `/${locale}`;
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-[999]">
      <div
        className={`relative h-12 w-12 text-white rounded-full cursor-pointer`}
        onClick={handleOnClick}
        style={{
          backgroundImage:
            "linear-gradient(47deg, #4131FF 0%, rgba(142, 91, 249, 0.70) 100%)",
        }}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center ease-out duration-150 ${rotateValue}`}
        >
          <Globe />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          {[...LANGUAGES].map((el, idx) => {
            const { translateY, translateX } = calculateTranslation(idx);
            return (
              <Link
                href={getHrefForLocales(el.code as LocaleOptionsType)}
                key={idx}
                style={{
                  transform: isOpen
                    ? `translateX(${translateX}px) translateY(${translateY}px)`
                    : "translateX(0) translateY(0)",

                  backgroundImage:
                    "linear-gradient(47deg, #4131FF 0%, rgba(142, 91, 249, 1) 100%)",
                }}
                className={`absolute ease-out duration-150 h-16 w-16 drop-shadow-lg rounded-full text-xl flex items-center justify-center ${
                  isOpen
                    ? "opacity-1 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  className="select-none"
                  src={el.icon}
                  alt={el.code}
                  width={35}
                  height={35}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
