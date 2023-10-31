import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: any, { params }: { params: { slug: string } }) {
  const request = req as NextApiRequest;

  try {
    const data = await prisma.boards.findFirst({
      where: {
        slug: {
          contains: (params?.slug as string).toLowerCase(),
        },
      },
    });

    if (data) {
      return Response.json(data, { status: 200 });
    } else {
      return Response.json({ message: "Board not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
