import argon2 from "argon2";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  // console.log(body);
  if (!body) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 400,
      },
    );
  }

  const userPassword = await argon2.hash(body.password);

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: userPassword,
        activated: true,
        activateToken: {
          connect: {
            id: body.token.id,
          },
        },
      },
    });

    return NextResponse.json({ message: `Created user ${createdUser.id}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 400,
      },
    );
  }
}
