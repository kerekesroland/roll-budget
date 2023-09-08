"use client";
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

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
      className={`rounded-[15px] p-4 py-6 cursor-pointer transition-background-color duration-300 ease-in-out ${
        !active && "hover:!bg-neutral-900"
      }`}
      style={{
        background: active
          ? "linear-gradient(47deg, #4131FF 0%, rgba(142, 91, 249, 0.70) 100%)"
          : "transparent",
      }}
    >
      <div className="flex items-center gap-4 px-4">
        <Image src={icon} alt={name} width="28" height="40" />
        <span className="hidden md:block text-[16px] mt-[2px] font-medium">
          {name}
        </span>
      </div>
    </div>
  );
};

export default SideNavItem;
