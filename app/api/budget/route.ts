import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const createdBudget = await prisma.budget.create({
      data: {
        name: body.name,
        price: body.price,
        type: body.type,
        date: body.date,
        category: {
          connect: { id: body.category },
        },
        user: {
          connect: { id: body.userId },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully created category ${createdBudget.name}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while creating category",
      },
      {
        status: 400,
      }
    );
  }
}
