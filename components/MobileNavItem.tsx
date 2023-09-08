"use client";

import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';

type Props = {
  name: string;
  index: number;
  toggleState: (value: boolean) => void;
};

const MobileNavItem = ({ name, index, toggleState }: Props) => {
  const router = useRouter();
  const handleNavigate = useCallback(() => {
    const url = `/${name.toLowerCase()}`;
    router.push(url);
    toggleState(false);
  }, [router, name, toggleState]);

  const handleLogout = useCallback(async () => {
    toast.success(
      "Successfully signed out, you will be redirected to the login page in a second!"
    );
    toggleState(false);
    setTimeout(async () => {
      await signOut();
    }, 2000);
  }, [toggleState]);

  return (
    <motion.button
      onClick={name !== "Logout" ? handleNavigate : handleLogout}
      className="text-xl underline underline-offset-4"
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? 50 : -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
      }}
    >
      {name}
    </motion.button>
  );
};

export default MobileNavItem;
