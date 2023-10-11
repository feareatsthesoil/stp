import { NextApiRequest } from "next";
import { prisma } from "../../../utils/prisma";

export async function GET(req: any) {
  const request = req as NextApiRequest;

  const data = await prisma.boards.findMany({
    where: {},
    orderBy: { name: "asc" },
  });

  return Response.json(data, { status: 200 });
}
