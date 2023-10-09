"use client";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

type Props = {
  name: string;
  active: boolean;
  icon: string;
};

const SideNavItem = ({ name, icon, active }: Props) => {
  const router = useRouter();
  const handleNavigate = useCallback(() => {
    router.replace(`/${name.toLowerCase()}`);
  }, [router, name]);

  const handleLogout = useCallback(async () => {
    toast.success(
      "Successfully signed out, you will be redirected to the login page in a second!"
    );
    setTimeout(async () => {
      await signOut();
    }, 2000);
  }, []);
  return (
    <div
      onClick={name !== "Logout" ? handleNavigate : handleLogout}
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
