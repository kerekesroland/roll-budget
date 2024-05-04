import { Reminder } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import { prisma } from "./prisma";
import { ReminderPriorityType, ColorType } from "@/models/Reminder";

export const getReminders = async () => {
  try {
    const user = await getCurrentUser();
    const reminders: Reminder[] = await prisma.reminder.findMany({
      where: {
        userId: user?.id,
      },
    });

    let isAnyPastDue = false;

    for (const reminder of reminders) {
      if (reminder.date < new Date()) {
        isAnyPastDue = true;
        break;
      }
    }

    if (isAnyPastDue) {
      const randomIndex = Math.floor(Math.random() * reminders.length);
      const randomReminder = reminders[randomIndex];

      await prisma.reminder.update({
        where: { id: randomReminder.id },
        data: {
          title: randomReminder.title,
          date: randomReminder.date,
        },
      });
    }

    const formattedReminders = reminders.map((reminder) => ({
      ...reminder,
      date: reminder.date.toISOString() as string,
      priority: Number(reminder.priority) as ReminderPriorityType,
      color: reminder.color as ColorType,
    }));
    return formattedReminders;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return null;
  }
};
