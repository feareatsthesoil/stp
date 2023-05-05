import { NextApiResponse } from "next";
import { withAuth } from "@clerk/nextjs/api";
import { prisma } from "../../../utils/prisma";

export default withAuth(async (req: any, res: NextApiResponse) => {
  const { body } = req;

  await prisma.events.create({
    data: {
      ...body,
      starts_at: new Date(body.starts_at),
      ends_at: body.ends_at === "" ? undefined : new Date(body.ends_at),
      userId: req.auth.userId,
    },
  });
  return res.status(200).json({ message: "inserted succesfully" });
});
