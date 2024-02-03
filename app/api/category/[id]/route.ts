import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the category has budgets associated
    const hasBudgets = await prisma.budget.count({
      where: {
        categoryId: params.id,
      },
    });

    if (hasBudgets) {
      return NextResponse.json(
        {
          message:
            "Cannot delete a category that has budgets associated with it!",
        },
        {
          status: 400,
        }
      );
    }

    // Start a Prisma transaction
    await prisma.$transaction(async (prisma) => {
      // Delete the category
      await prisma.category.delete({
        where: {
          id: params.id,
        },
      });
    });

    // Return a success response if the category is deleted
    return NextResponse.json({
      status: 200,
      message: `Successfully deleted category`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while deleting category",
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
    await prisma.category.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        icon: body.icon,
        limit: body.limit,
        currencyType: body.currencyType,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully updated category`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error while updating category",
      },
      {
        status: 400,
      }
    );
  }
}
