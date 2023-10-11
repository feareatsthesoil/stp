import { NextApiRequest } from "next";
import { prisma } from "../../../../../utils/prisma";
import { moderate } from "../../../../../utils/openai";
import { getUserData } from "../../../../../utils/userData";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: any, { params }: { params: { id: string } }) {
  const request = req as NextApiRequest;
  const { searchParams } = new URL(request.url ?? "");
  const page = searchParams.get("page");
  const { userId } = getAuth(request);
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

  return Response.json(dataReturned, { status: 200 });
}

export async function POST(req: any, { params }: { params: { id: string } }) {
  const request = req as NextRequest & { auth: { userId: string } };

  const { userId } = getAuth(request);
  const body = await request.json();
  if (!userId)
    return Response.json({ message: "Not logged in" }, { status: 401 });

  const result = await moderate(body.content);
  if (result.flagged) {
    return Response.json({ message: "Inappropriate comment" }, { status: 422 });
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

  return Response.json({ message: "Created" }, { status: 201 });
}
