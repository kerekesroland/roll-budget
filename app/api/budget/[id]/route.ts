import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const budget = await prisma.budget.delete({
      where: {
        id: params.id,
      },
    });

    if (budget.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: budget.categoryId },
      });

      // Calculate the new current value for the category after removing the budget's price
      const newCurrent = (category?.current || 0) - budget.price;

      // Update the category's current property with the new value
      await prisma.category.update({
        where: { id: budget.categoryId },
        data: {
          current: newCurrent,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      message: `Successfully deleted budget`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while deleting budget",
      },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  try {
    // Fetch the existing budget from the database
    const existingBudget = await prisma.budget.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingBudget) {
      return NextResponse.json(
        {
          message: "Budget not found",
        },
        {
          status: 404,
        }
      );
    }

    // Calculate the difference in price (new - old)
    const priceDifference = body.price - existingBudget.price;

    // Update the budget with the new data
    await prisma.budget.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        price: body.price,
        date: body.date,
        categoryId: body.category,
        type: body.type,
      },
    });

    // Fetch the category from the database
    const category = await prisma.category.findUnique({
      where: { id: body.category },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update the category's current property with the price difference
    await prisma.category.update({
      where: { id: body.category },
      data: {
        current: category.current + priceDifference,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully updated budget`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while updating budget",
      },
      {
        status: 400,
      }
    );
  }
}
