import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scheduleReminderForUser } from "@/lib/scheduleRemindersForUser";
import getCurrentUser from "@/lib/getCurrentUser";
import { ReminderPriorityType, ColorType } from "@/models/Reminder";
import { Reminder } from "@prisma/client";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.user.id) {
    return NextResponse.json(
      {
        message: "You are not logged in!",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Create the reminder entry
    const createdReminder = await prisma.reminder.create({
      data: {
        title: body.title,
        color: body.color,
        priority: body.priority.toString(),
        date: body.date,
        user: {
          connect: { id: body.user.id },
        },
      },
    });

    await scheduleReminderForUser({
      user: body.user,
      reminder: createdReminder,
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully created reminder ${createdReminder.title}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while creating reminder",
      },
      {
        status: 400,
      }
    );
  }
}

export async function GET(req: Request) {
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
    return NextResponse.json({
      status: 200,
      data: formattedReminders,
    });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      {
        message: "Error while getting the reminders",
      },
      {
        status: 400,
      }
    );
  }
}
