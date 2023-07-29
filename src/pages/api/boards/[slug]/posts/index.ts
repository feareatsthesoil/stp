import { withAuth } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";
import { moderate } from "../../../../../utils/openai";
import { Boards, prisma } from "../../../../../utils/prisma";
import { getUserData } from "../../../../../utils/userData";

async function postsIndex(
  req: NextApiRequest & { auth: { userId: string } },
  res: NextApiResponse
) {
  const { slug, page } = req.query;
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
  if (req.method === "GET") {
    let searchQuery = {};
    if (req.query.q) {
      const lowerCaseQuery = (req.query.q as string).toLowerCase();
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
      take: 10,
      skip: (pageNum - 1) * 10,
      orderBy: { lastCommentedAt: "desc" },
    });

    interface PostData {
      id: number;
      title: string;
      content: string | null;
      attachment: string | null;
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
      uploadDetails: {} | null;
    }

    const datareturned = await Promise.all(
      data.map(async (post) => {
        const userId = post.userId;
        try {
          const user = await getUserData(userId);
          const board = await prisma.boards.findFirstOrThrow({
            where: { id: post.boardId },
          });
          let postData: PostData = {
            id: post.id,
            title: post.title,
            content: post.content,
            attachment: post.attachment,
            boardId: post.boardId,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            anon: post.anon,
            uploadDetails: post.uploadDetails,
            isAuthor: req.auth.userId === userId,
            board,
          };

          if (!post.anon) {
            const user = await getUserData(userId);
            const { firstName, lastName, profileImageUrl } = user;
            postData = {
              ...postData,
              user: { firstName, lastName, profileImageUrl },
            };
          }

          return postData;
        } catch (error) {
          console.error(
            `Couldn't get user details for user ${userId}: `,
            error
          );
          return post;
        }
      })
    );
    res.setHeader("total-records", count.toString());
    res.setHeader("total-pages", Math.ceil(count / 10).toString());
    res.setHeader("current-page", pageNum.toString());

    return res.status(200).json(datareturned);
  } else if (req.method === "POST") {
    const { body } = req;
    const { userId } = req.auth;
    if (!userId) return res.status(401).json({ message: "Not logged in" });
    let result = await moderate(body.content!);
    if (result.flagged) {
      return res.status(422).json({ message: "Inappropriate comment" });
    }

    result = await moderate(body.title!);
    if (result.flagged) {
      return res.status(422).json({ message: "Inappropriate title" });
    }

    await prisma.post.create({
      data: {
        ...body,
        userId,
        boardId: board ? board.id : null,
      },
    });

    return res.status(201).json({ message: "Created" });
  } else {
    res.status(412).json({ message: "Invalid method" });
  }
}
export default withAuth(postsIndex as any);
