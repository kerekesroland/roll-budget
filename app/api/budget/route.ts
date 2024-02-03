import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // Fetch the category
    const category = await prisma.category.findUnique({
      where: { id: body.category },
    });

    if (category?.currencyType !== body.currencyType) {
      return NextResponse.json(
        {
          message: `Invalid currencyType for the category. Expected ${category?.currencyType}, got ${body.currencyType}`,
          type: "currencyMismatch",
        },
        {
          status: 400,
        }
      );
    }

    // Create the budget entry
    const createdBudget = await prisma.budget.create({
      data: {
        name: body.name,
        price: body.price,
        type: body.type,
        currencyType: body.currencyType,
        date: body.date,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        category: {
          connect: { id: body.category },
        },
        user: {
          connect: { id: body.userId },
        },
      },
    });

    const budgetMonth = createdBudget.date.getMonth() + 1;
    const currentMonth = new Date().getMonth() + 1;

    // Update the current amount in the category if it's an "expense"
    if (createdBudget.type === "expense") {
      await prisma.category.update({
        where: { id: category?.id },
        data: {
          current: category?.current + body.price,
        },
      });
      if (budgetMonth === currentMonth) {
        await prisma.category.update({
          where: { id: category?.id },
          data: {
            currentPerMonth: category?.currentPerMonth + body.price,
          },
        });
      }
    }

    return NextResponse.json({
      status: 200,
      message: `Successfully created budget ${createdBudget.name}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while creating budget",
      },
      {
        status: 400,
      }
    );
  }
}
