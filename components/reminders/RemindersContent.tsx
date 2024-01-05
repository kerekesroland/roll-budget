"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";

import { remindersFilter, remindersModalOpen } from "@/app/store";
import { IUser } from "@/models/User";

import MobileNavbar from "../MobileNavbar";
import AddReminderModal from "../modals/AddReminderModal";
import DatePickerForm2 from "../CustomDateShowcase";

interface IProps {
  user: IUser | null;
}

const RemindersContent = ({ user }: IProps) => {
  const [isModalOpened, setIsModalOpened] = useRecoilState(remindersModalOpen);
  const [_, setFilters] = useRecoilState(remindersFilter);

  const toggleState = useCallback(
    (value: boolean) => {
      setIsModalOpened(value);
    },
    [setIsModalOpened]
  );

  const handleSetFilterValue = useCallback(
    (key: any, value: string) => {
      setFilters((prevFilters: any) => {
        const currentValue = prevFilters[key];
        const newValue = currentValue === value ? "" : value;
        return { ...prevFilters, [key]: newValue };
      });
    },
    [setFilters]
  );

  return (
    <>
      <div className="fixed top-5 right-5 z-[99999]">
        <MobileNavbar />
      </div>
      <div className="flex flex-col items-start lg:items-start justify-between gap-4 lg:gap-0 mt-4 mb-4">
        <div className="flex items-center gap-12">
          <h2 className="font-semibold text-2xl">Reminders</h2>
          <div
            onClick={() => toggleState(true)}
            className="w-[50px] h-[50px] rounded-xl border-dashed border-2 border-white flex justify-center items-center cursor-pointer"
          >
            <Image src={"/images/Plus.svg"} alt="Plus" width={20} height={20} />
          </div>
        </div>
        <div className="overflow-y-auto w-full scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700">
          <DatePickerForm2
            calendarAdditionalClasses="w-full h-[calc(100vh-10rem)] calendar-override"
            callback={handleSetFilterValue}
            filterKey="date"
          />
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
                <AddReminderModal
                  toggleState={toggleState}
                  userId={user?.id as string}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RemindersContent;
