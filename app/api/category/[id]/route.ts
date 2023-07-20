import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: {
        id: params.id,
      },
    });

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
