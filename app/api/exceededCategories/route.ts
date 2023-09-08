import { NextResponse } from 'next/server';

import getCurrentUser from '@/lib/getCurrentUser';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const user = await getCurrentUser();
  try {
    const res = await prisma.category.findMany({
      where: {
        current: {
          gt: prisma.category.fields.limit,
        },
        userId: user?.id,
      },
      orderBy: {
        current: "desc",
      },
      take: 4,
    });
    return NextResponse.json(res);
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
