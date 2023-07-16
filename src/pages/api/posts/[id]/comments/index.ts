import { clerkClient, withAuth } from "@clerk/clerk-sdk-node";
import { NextApiRequest, NextApiResponse } from "next";
import { checkComment } from "../../../../../utils/perspective";
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

  const pageNum = Number(page) || 1;
  if (req.method === "GET") {
    const count = await prisma.comment.count({
      where: { postId: post.id },
      orderBy: { createdAt: "desc" },
    });
    res.setHeader("total-records", count.toString());
    res.setHeader("total-pages", Math.ceil(count / 10).toString());
    res.setHeader("current-page", pageNum.toString());

    const data = await prisma.comment.findMany({
      where: { postId: post.id },
      take: 10,
      skip: (pageNum - 1) * 10,
      orderBy: { createdAt: "desc" },
    });
    const datareturned = await Promise.all(
      data.map(async (comment) => {
        const userId = comment.userId;
        const user = await clerkClient.users.getUser(userId);
        const { firstName, lastName, profileImageUrl } = user;
        return { ...comment, user: { firstName, lastName, profileImageUrl } };
      })
    );

    return res.status(200).json(datareturned);
  } else if (req.method === "POST") {
    const { userId } = req.auth;
    const { body } = req;
    if (!userId) return res.status(401).json({ message: "Not logged in" });
    // let perspectiveResponse = await checkComment(body.content!);

    // if (
    //   perspectiveResponse.data.attributeScores.TOXICITY.summaryScore.value > 0.7
    // ) {
    //   return res.status(400).json({ message: "Too toxic" });
    // }
    const result = await moderate(body.content!)
    if(result.flagged){
      return res.status(422).json({message: "Inappropriate comment"})
    }

    await prisma.comment.create({ data: { ...body, userId, postId: post.id } });
    return res.status(201).json({ message: "Created" });
  }
}

export default withAuth(getComments);
