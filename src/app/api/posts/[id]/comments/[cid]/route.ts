import { prisma } from "@/utils/prisma";
import { NextApiRequest } from "next";

export async function DELETE(
  req: any,
  { params }: { params: { id: string; cid: string } }
) {
  const request = req as NextApiRequest;

  const data = await prisma.comment.findFirstOrThrow({
    where: { id: Number(params?.cid) },
  });

  if (request.method === "DELETE") {
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
    return Response.json(data, { status: 200 });
  }
}
