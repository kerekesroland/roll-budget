import { Reminder } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import { prisma } from "./prisma";
import { ColorType, ReminderPriorityType } from "@/models/Reminder";

export const getReminders = async () => {
  try {
    const user = await getCurrentUser();
    const res: Reminder[] = await prisma.reminder.findMany({
      where: {
        userId: user?.id,
      },
    });

    const returnValue = res?.map((item) => {
      return {
        ...item,
        date: item?.date?.toISOString() as string,
        priority: Number(item?.priority) as ReminderPriorityType,
        color: item?.color as ColorType,
      };
    });
    return returnValue;
  } catch (error) {
    console.error(error);
    return null;
  }
};
