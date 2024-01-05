"use client";

import React, { useCallback, useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { IReminder } from "@/models/Reminder";
import { AnimatePresence, motion } from "framer-motion";
import EditReminderModal from "../modals/EditReminderModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ReminderCard = (reminder: IReminder) => {
  const { date, title, color, userId, isComplete, priority, id } = reminder;

  const router = useRouter();
  const [isReminderEditModalOpen, setIsReminderEditModalOpen] =
    useState<boolean>(false);

  const [isReminderComplete, setIsReminderComplete] =
    useState<boolean>(isComplete);

  const cardColorMapping = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
  };

  const cardColor = cardColorMapping[color];
  const dateString = new Date(date);
  const formattedDate = dateString.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCheckClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        setIsReminderComplete((prev) => !prev);
        await axios.put(`/api/reminder/${id}`, {
          ...reminder,
          priority: reminder.priority.toString(),
          isComplete: !isReminderComplete,
        });
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [id, reminder, isReminderComplete, router]
  );

  return (
    <>
      <div
        onClick={() => setIsReminderEditModalOpen(true)}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full p-[1.5rem] sm:p-8 bg-[#1C293A] rounded-xl transition-all duration-300 hover:brightness-110 cursor-pointer"
      >
        <div className="flex gap-8 justify-between items-center w-full">
          <div
            onClick={handleCheckClick}
            className={`flex flex-shrink-0 justify-center items-center w-[50px] h-[50px] rounded-full ${cardColor}`}
          >
            {isReminderComplete && <CheckIcon height={40} width={50} />}
          </div>

          <div className="flex flex-col w-full">
            <div className="flex justify-start">
              <h3 className="text-lg font-medium select-none">{title}</h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-md font-medium text-[#79889D] select-none">
                {formattedDate}
              </span>
              <p className="text-[#79889D] font-medium select-none">
                Priority: {priority}
              </p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isReminderEditModalOpen && (
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
              onClick={() => setIsReminderEditModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center z-[100]"
            >
              <EditReminderModal
                closeModal={() => setIsReminderEditModalOpen(false)}
                userId={userId}
                reminder={{
                  id,
                  title,
                  date,
                  priority,
                  isComplete,
                  color,
                  userId,
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReminderCard;
