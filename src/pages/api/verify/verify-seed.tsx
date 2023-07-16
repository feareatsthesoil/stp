import { NextApiResponse } from "next";
import { withAuth } from "@clerk/nextjs/api";
import { prisma } from "../../../utils/prisma";

async function verifySeed(req: any, res: NextApiResponse) {
  const { body } = req;
  const { userId } = req.auth;
  if (!userId) return res.status(401).json({ message: "Not logged in" });
  const { id, ...rest } = body;
  await prisma.contacts.create({
    data: { ...rest, display: body.profile ? body.display : true, userId },
  });
  return res.status(200).json({ message: "Inserted succesfully" });
}
export default withAuth(verifySeed);
