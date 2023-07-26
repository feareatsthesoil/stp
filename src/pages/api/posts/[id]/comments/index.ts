import { clerkClient, withAuth } from "@clerk/clerk-sdk-node";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";
import { moderate } from "../../../../../utils/openai";

async function getComments(
  req: NextApiRequest & { auth: { userId: string } },
  res: NextApiResponse
) {
  const { id, page } = req.query;
  const post = await prisma.post.findFirstOrThrow({
    where: { id: Number(id) },
  });

  if (req.method === "GET") {
    const pageNum = Number(page) || 1;
    const data = await prisma.comment.findMany({
      where: { postId: post.id },
      take: 10,
      skip: (pageNum - 1) * 10,
      orderBy: { createdAt: "desc" },
    });

    const dataReturned = await Promise.all(
      data.map(async (comment) => {
        const { userId, anon, ...commentWithoutUserId } = comment;
        const isAuthor = req.auth.userId === userId;
        let user = null;

        if (!anon) {
          const { firstName, lastName, profileImageUrl } =
            await clerkClient.users.getUser(userId);
          user = { firstName, lastName, profileImageUrl };
        }

        return {
          ...commentWithoutUserId,
          user,
          isAuthor,
        };
      })
    );

    return res.status(200).json(dataReturned);
  }

  if (req.method === "POST") {
    const { userId } = req.auth;
    const { body } = req;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    const result = await moderate(body.content!);
    if (result.flagged) {
      return res.status(422).json({ message: "Inappropriate comment" });
    }

    await prisma.comment.create({
      data: {
        ...body,
        userId,
        postId: post.id,
      },
    });

    return res.status(201).json({ message: "Created" });
  }
}

export default withAuth(getComments);
