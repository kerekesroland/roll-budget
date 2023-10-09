"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";

import { inviteModalOpen } from "@/app/store";

import MobileNavbar from "../MobileNavbar";
import InviteModal from "../modals/InviteModal";

type Props = {};

const InviteForm = (props: Props) => {
  const [isModalOpened, setIsModalOpened] = useRecoilState(inviteModalOpen);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );

  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div className="flex items-center gap-12 mt-4 mb-4">
        <h2 className="font-semibold text-2xl">Invites</h2>
        <div
          onClick={() => toggleState(true)}
          className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
        >
          <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
        </div>
        <AnimatePresence>
          {isModalOpened && (
            <div className="bg-gray-900 backdrop-brightness-50 backdrop-blur-sm bg-opacity-50 fixed inset-0 flex items-center justify-center z-[100]">
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                onClick={() => toggleState(false)}
                className="fixed inset-0 flex items-center justify-center z-[100]"
              >
                <InviteModal />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default InviteForm;
