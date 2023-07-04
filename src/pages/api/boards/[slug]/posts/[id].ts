import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/prisma";
import { withAuth } from "@clerk/nextjs/api";
import { checkComment } from "../../../../../utils/perspective";

export async function postGet(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(req.query.id) },
  });
  if (req.method === "GET") {
    console.log({ data });
    return res.status(200).json(data);
  } else if (req.method === "PUT") {
    const body = req.body;

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
    const dataNew = await prisma.post.update({
      where: { id: data.id },
      data: { ...data, ...body },
    });
    return res.status(200).json(dataNew);
  }
}

export default withAuth(postGet);
