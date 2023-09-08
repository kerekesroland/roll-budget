import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const token = await prisma.activateToken.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!token) {
      return NextResponse.json(
        {
          message: "Invitation not found!",
        },
        {
          status: 404,
        },
      );
    }

    if (token.userId) {
      return NextResponse.json(
        {
          message: "Cannot delete already accepted invitations!",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.activateToken.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: `Successfully deleted invitation!`,
    });
  } catch (error) {
    console.error("Error deleting invitation:", error);
    return NextResponse.json(
      {
        message: "Failed to delete invitation.",
      },
      {
        status: 500,
      },
    );
  }
}
