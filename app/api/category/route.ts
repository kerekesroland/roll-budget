import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const createdCategory = await prisma.category.create({
      data: {
        name: body.categoryName,
        limit: body.categoryLimit,
        user: {
          connect: { id: body.userId },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully created category ${createdCategory.name}`,
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
