import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/getCurrentUser";
import {
  cancelReminder,
  reScheduleReminder,
} from "@/lib/scheduleRemindersForUser";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const reminder = await prisma.reminder.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!reminder) {
      return NextResponse.json(
        {
          message: "Reminder not found!",
        },
        {
          status: 404,
        }
      );
    }

    await cancelReminder(reminder?.id);

    await prisma.reminder.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully deleted reminder!`,
    });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      {
        message: "Failed to delete reminder.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bodyPromise = req.json();
    const userPromise = getCurrentUser();

    const [body, user] = await Promise.all([bodyPromise, userPromise]);

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized!",
        },
        {
          status: 400,
        }
      );
    }

    const reminder = await prisma.reminder.findFirst({
      where: {
        id: params.id,
      },
    });

    const newReminder = await prisma.reminder.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        date: body.date,
        priority: body.priority,
        color: body.color,
        isComplete: body.isComplete,
      },
    });

    if (
      reminder &&
      reminder?.date.getTime() !== new Date(body.date).getTime()
    ) {
      await reScheduleReminder(user, newReminder);
    }

    return NextResponse.json({
      status: 200,
      message: `Successfully updated reminder`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while updating reminder",
      },
      {
        status: 400,
      }
    );
  }
}
