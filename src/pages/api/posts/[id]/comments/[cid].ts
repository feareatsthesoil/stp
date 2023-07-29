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
    const post = await prisma.post.findFirst({ where: { id: data.postId } });
    if (post) {
      const latestComment = await prisma.comment.findFirst({
        where: { postId: post.id },
        orderBy: { createdAt: "desc" },
      });
      const updatedDate = latestComment
        ? latestComment.createdAt
        : post.createdAt;

      await prisma.post.update({
        where: { id: data.postId },
        data: { lastCommentedAt: updatedDate },
      });
    }
    return res.status(200).json(data);
  }
}
export default withAuth(commentShow);
