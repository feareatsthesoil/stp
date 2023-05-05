import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function directoryIndex(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.contacts.findMany({
    where: { approved: true, display: true },
    orderBy: { name: "asc" },
  });

  return res.status(200).json(data);
}
