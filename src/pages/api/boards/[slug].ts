import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function resourcesIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug = "INVALID_BOARD" } = req.query;

  try {
    const data = await prisma.boards.findFirst({
      where: {
        slug: {
          contains: (slug as string).toLowerCase(),
        },
      },
    });

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Board not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
