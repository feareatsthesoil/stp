import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { moderate } from "../../../../../utils/openai";
import { Boards, prisma } from "../../../../../utils/prisma";
import { getUserData } from "../../../../../utils/userData";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);
  const { userId } = getAuth(req);
  const page = searchParams.get("page");
  const q = searchParams.get("q");
  const pageNum = Number(page) || 1;

  const board =
    slug !== "all"
      ? await prisma.boards.findFirstOrThrow({
          where: {
            slug: { equals: (slug as string).toLowerCase() },
          },
        })
      : null;

  let where = board ? { boardId: board.id } : {};

  let searchQuery = {};
  if (q) {
    const lowerCaseQuery = (q as string).toLowerCase();
    searchQuery = {
      ...searchQuery,
      OR: [
        { title: { contains: lowerCaseQuery } },
        { content: { contains: lowerCaseQuery } },
      ],
    };
  }
  where = { ...where, ...searchQuery };

  const count = await prisma.post.count({
    where,
    orderBy: { lastCommentedAt: "desc" },
  });
  const data = await prisma.post.findMany({
    where,
    take: 15,
    skip: (pageNum - 1) * 15,
    orderBy: { lastCommentedAt: "desc" },
  });

  interface PostData {
    id: number;
    title: string;
    content: string | null;
    attachments: any[];
    boardId: number;
    createdAt: Date;
    updatedAt: Date;
    anon: boolean | null;
    isAuthor: boolean;
    board: Boards;
    user?: {
      firstName: string | null;
      lastName: string | null;
      profileImageUrl: string;
    };
  }

  const datareturned = await Promise.all(
    data.map(async (post) => {
      const postUserId = post.userId;
      let board = null;
      try {
        board = await prisma.boards.findFirstOrThrow({
          where: { id: post.boardId },
        });
        let postData: PostData = {
          id: post.id,
          title: post.title,
          content: post.content,
          attachments: post.attachments as any[],
          boardId: post.boardId,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          anon: post.anon,
          isAuthor: userId === postUserId,
          board,
        };

        if (!post.anon) {
          const user = await getUserData(postUserId);
          const { firstName, lastName, imageUrl } = user;
          postData = {
            ...postData,
            user: { firstName, lastName, profileImageUrl: imageUrl },
          };
        }
        return postData;
      } catch (error) {
        console.error(`Couldn't get user details for user ${userId}: `, error);
        return { ...post, board };
      }
    })
  );

  const headers = {
    "total-records": count.toString(),
    "total-pages": Math.ceil(count / 15).toString(),
    "current-page": pageNum.toString(),
  };

  return Response.json(datareturned, { status: 200, headers });
}

export async function POST(
  req: NextRequest & { auth: { userId: string } },
  { params: { slug } }: { params: { slug: string } }
) {
  const body = await req.json();
  const { content, title } = body;
  const board =
    slug !== "all"
      ? await prisma.boards.findFirstOrThrow({
          where: {
            slug: { equals: (slug as string).toLowerCase() },
          },
        })
      : null;
  let where = board ? { boardId: board.id } : {};
  if (slug === "all") {
    const res: NextResponse = new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/chan/gc",
      },
    });
    return res;
  }
  const { userId } = getAuth(req);
  if (!userId)
    return Response.json({ message: "Not logged in" }, { status: 401 });
  let result = await moderate(content ?? "");
  if (result.flagged) {
    return Response.json({ message: "Inappropriate comment" }, { status: 422 });
  }

  result = await moderate(title!);
  if (result.flagged) {
    return Response.json({ message: "Inappropriate title" }, { status: 422 });
  }

  await prisma.post.create({
    data: {
      ...body,
      userId,
      boardId: board ? board.id : 0,
    },
  });

  return Response.json({ message: "Created" }, { status: 201 });
}
