import { NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async (req: any, res: NextApiResponse) => {
  const calendarData = await prisma.events.findMany({
    orderBy: { starts_at: "asc" },
  });

  return res.status(200).json(calendarData);
};
