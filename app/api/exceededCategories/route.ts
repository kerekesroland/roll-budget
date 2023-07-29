import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await prisma.category.findMany({
      where: {
        current: {
          gt: prisma.category.fields.limit,
        },
      },
      orderBy: {
        current: "desc",
      },
      take: 4,
    });
    return NextResponse.json({
      status: 200,
      data: res,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while querying exceeded categories!",
      },
      {
        status: 400,
      }
    );
  }
}
