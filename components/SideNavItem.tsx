"use client";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

type Props = {
  /**
   * @param {string} name The name of the SideNavigation item
   */
  name: string;
  /**
   * @param {string} href The href of the SideNavigation item
   */
  href: string;
  /**
   * @param {boolean} active The state representing if the nav item is active
   */
  active: boolean;
  /**
   * @param {string} icon The icon appearing next to the nav item text
   */
  icon: string;
};

const SideNavItem = ({ name, href, icon, active }: Props) => {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const handleNavigate = useCallback(() => {
    router.replace(`/${locale}/${href.toLowerCase()}`);
  }, [router, name]);

  const handleLogout = useCallback(async () => {
    toast.success(t("signOut"));
    setTimeout(async () => {
      await signOut();
    }, 2000);
  }, []);

  return (
    <div
      onClick={
        name !== "Logout" && name !== "Kilépés" ? handleNavigate : handleLogout
      }
      className={`rounded-[15px] relative p-4 py-6 cursor-pointer transition-background-color duration-300 ease-in-out ${
        !active && "hover:!bg-neutral-900"
      }`}
    >
      {active && (
        <motion.div
          className="absolute inset-0"
          transition={{
            ease: "easeOut",
          }}
          style={{
            background:
              "linear-gradient(47deg, #4131FF 0%, rgba(142, 91, 249, 0.70) 100%)",
            borderRadius: "10px",
          }}
          layoutId="active-item"
        />
      )}
      <div className="flex relative text-white items-center gap-4 px-4">
        <Image src={icon} alt={name} width="28" height="40" />
        <span className="hidden md:block text-[16px] mt-[2px] font-medium">
          {name}
        </span>
      </div>
    </div>
  );
};

export default SideNavItem;
