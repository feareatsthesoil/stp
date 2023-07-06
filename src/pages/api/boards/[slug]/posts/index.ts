import { clerkClient, withAuth } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";
import { checkComment } from "../../../../../utils/perspective";
import { prisma } from "../../../../../utils/prisma";

async function postsIndex(
  req: NextApiRequest & { auth: { userId: string } },
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
      const lowerCaseQuery = (req.query.q as string).toLowerCase();
      searchQuery = {
        ...searchQuery,
        OR: [
          { title: { contains: lowerCaseQuery } },
          { content: { contains: lowerCaseQuery } },
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
    const datareturned = await Promise.all(
      data.map(async (post) => {
        const userId = post.userId;
        try {
          const user = await clerkClient.users.getUser(userId);
          const { firstName, lastName, profileImageUrl } = user;
          return { ...post, user: { firstName, lastName, profileImageUrl } };
        } catch (error) {
          console.error(
            `Couldn't get user details for user ${userId}: `,
            error
          );
          return post;
        }
      })
    );

    return res.status(200).json(datareturned);
  } else if (req.method === "POST") {
    const { body } = req;

    const { userId } = req.auth;
    if (!userId) return res.status(401).json({ message: "Not logged in" });
    let perspectiveResponse = await checkComment(body.content!);

    if (
      perspectiveResponse.data.attributeScores.TOXICITY.summaryScore.value > 0.7
    ) {
      return res.status(400).json({ message: "Too toxic" });
    }
    perspectiveResponse = await checkComment(body.title!);

    if (
      perspectiveResponse.data.attributeScores.TOXICITY.summaryScore.value > 0.7
    ) {
      return res.status(400).json({ message: "Too toxic" });
    }
    await prisma.post.create({ data: { ...body, userId, boardId: board.id } });

    return res.status(201).json({ message: "Created" });
  } else {
    res.status(412).json({ message: "Invalid method" });
  }
}
export default withAuth(postsIndex as any);
