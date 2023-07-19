import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.budget.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully deleted budget`,
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
