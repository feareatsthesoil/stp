import { withAuth } from "@clerk/clerk-sdk-node";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";

async function commentShow(
  req: NextApiRequest & { auth: { userId: string } },
  res: NextApiResponse
) {
  const data = await prisma.comment.findFirstOrThrow({
    where: { id: Number(req.query.cid) },
  });

  if (req.method === "DELETE") {
    await prisma.comment.delete({ where: { id: data.id } });
    return res.status(200).json(data);
  }
}
export default withAuth(commentShow);
