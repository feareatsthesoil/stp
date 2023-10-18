import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";
import { moderate } from "../../../../../utils/openai";
import { getUserData } from "../../../../../utils/userData";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url ?? "");
    const page = searchParams.get("page");
    const { userId } = getAuth(req);
    const post = await prisma.post.findFirstOrThrow({
      where: { id: Number(params?.id) },
    });

    const pageNum = Number(page) || 1;
    const data = await prisma.comment.findMany({
      where: { postId: post.id },
      take: 10,
      skip: (pageNum - 1) * 10,
      orderBy: { createdAt: "desc" },
    });

    const dataReturned = await Promise.all(
      data.map(async (comment) => {
        const { anon, ...commentWithoutUserId } = comment;
        const isAuthor = userId === comment?.userId;
        let user = null;

        if (!anon) {
          const { firstName, lastName, imageUrl } = await getUserData(
            comment.userId
          );
          user = { firstName, lastName, profileImageUrl: imageUrl };
        }

        return {
          ...commentWithoutUserId,
          user,
          isAuthor,
        };
      })
    );

    return res.status(200).json(dataReturned);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(req);
    const body = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const result = await moderate(body.content);
    if (result.flagged) {
      return res.status(422).json({ message: "Inappropriate comment" });
    }

    const commentRow = await prisma.comment.create({
      data: {
        ...body,
        userId,
        postId: +params.id,
      },
    });
    await prisma.post.update({
      where: { id: +params.id },
      data: { lastCommentedAt: commentRow.createdAt },
    });

    return res.status(201).json({ message: "Created" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while creating the comment." });
  }
}
