"use client";

import { motion } from "framer-motion";
import ReminderCard from "./ReminderCard";
import { IReminder } from "@/models/Reminder";
import { useRecoilState } from "recoil";
import { remindersFilter } from "@/app/store";
import { Combobox } from "../ComboBox";
import { useTranslations } from "next-intl";

interface IProps {
  reminders: IReminder[];
}

const ActiveReminders = ({ reminders }: IProps) => {
  const t = useTranslations("reminders");
  const [filters, setFilters] = useRecoilState(remindersFilter);

  const childVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  const handleSetPriority = (data: number) => {
    setFilters((prev) => ({
      ...prev,
      priority: prev.priority === data ? null : data,
    }));
  };

  const filteredReminders = reminders
    .filter((reminder) => {
      if (filters.date) {
        const reminderDate = new Date(reminder.date);
        const filtersDate = new Date(filters.date);
        return (
          reminderDate.getDate() === filtersDate.getDate() &&
          reminderDate.getMonth() === filtersDate.getMonth() &&
          reminderDate.getFullYear() === filtersDate.getFullYear()
        );
      }
      return true;
    })
    .filter((reminder) => {
      if (filters.priority) {
        return reminder.priority === Number(filters.priority);
      }
      return true;
    });

  return (
    <div className="flex flex-col items-center h-screen min-w-0 lg:min-w-[450px] border-t-[1px] border-t-[#1C293A] 3xl:border-t-0 3xl:border-l-[1px] 3xl:border-l-[#1C293A]">
      <div className="flex items-center w-full justify-between gap-12 mt-4 mb-4 3xl:px-12">
        <h2 className="font-semibold text-2xl">{t("active_reminders")}</h2>
        <Combobox
          title="priority"
          options={[
            {
              label: "1",
              value: "1",
            },
            {
              label: "2",
              value: "2",
            },
            {
              label: "3",
              value: "3",
            },
            {
              label: "4",
              value: "4",
            },
            {
              label: "5",
              value: "5",
            },
          ]}
          callback={handleSetPriority}
        />
      </div>
      <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#030711bf] scrollbar-track-rounded-xl scrollbar-track-slate-700 pl-0 xs:p-0 xs:pr-12 3xl:pl-8 3xl:pb-12 items-start justify-start gap-8">
        {filteredReminders?.map((reminder, idx) => (
          <motion.div
            className="3xl:w-full"
            variants={childVariants}
            initial="hidden"
            animate="visible"
            custom={idx}
            key={reminder.id}
          >
            <ReminderCard {...reminder} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActiveReminders;
