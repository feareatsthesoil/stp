import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { moderate } from "../../../../../utils/openai";
import { prisma } from "../../../../../utils/prisma";
import { getUserData } from "../../../../../utils/userData";

export async function GET(
  req: NextRequest,
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
    return Response.json(dataReturned);
  } catch (error) {
    return new Response("An error occurred while fetching data.", {
      status: 500,
    });
  }
}
export async function POST(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(req);
    const body = req.body;

    if (!userId) {
      return new Response("Not logged in", { status: 401 });
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

    return new Response(JSON.stringify({ message: "Created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred while fetching data.", {
      status: 500,
    });
  }
}
