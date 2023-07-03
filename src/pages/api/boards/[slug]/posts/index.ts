import { withAuth } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";

async function postsIndex(
  req: NextApiRequest & { auth?: { userId?: string | null } },
  res: NextApiResponse
) {
  const { slug, page } = req.query;
  const pageNum = Number(page) || 1;
  const board = await prisma.boards.findFirstOrThrow({
    where: {
      slug: { equals: (slug as string).toLowerCase() },
    },
  });

  if (req.method === "GET") {
    const count = await prisma.post.count({
      where: { boardId: board.id },
      orderBy: { createdAt: "desc" },
    });
    let searchQuery = {};
    if (req.query.q) {
      searchQuery = {
        ...searchQuery,
        OR: [
          { title: { contains: req.query.q, mode: "insensitive" } },
          { content: { contains: req.query.q, mode: "insensitive" } },
        ],
      };
    }
    res.setHeader("total-records", count.toString());
    res.setHeader("total-pages", (count / 10).toString());
    res.setHeader("current-page", pageNum.toString());

    const data = await prisma.post.findMany({
      where: { boardId: board.id, ...searchQuery },
      take: 10,
      skip: (pageNum - 1) * 10,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { body } = req;

    const userId = req.auth?.userId ?? null;
    if (!userId) return res.status(401).json({ message: "Not logged in" });

    console.log("Request body:", body); // Added logging here

    try {
      await prisma.post.create({
        data: { ...body, userId, boardId: board.id },
      });
    } catch (error) {
      console.error("Error while creating post:", error); // Log any error occurred during post creation
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(201).json({ message: "Created" });
  } else {
    res.status(412).json({ message: "Invalid method" });
  }
}

export default withAuth(postsIndex);
