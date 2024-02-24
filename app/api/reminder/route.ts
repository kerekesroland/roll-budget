import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scheduleReminderForUser } from "@/lib/scheduleRemindersForUser";

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
