import { withAuth } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

interface CustomApiRequest extends NextApiRequest {
  auth?: { userId: string } | null;
}

async function likesIndex(req: CustomApiRequest, res: NextApiResponse) {
  const { userId } = req.auth ?? { userId: null };

  if (req.method === "GET") {
    const count = await prisma.like.count({
      where: {
        likeableType: req.query.likeableType as string,
        likeableId: Number(req.query.likeableId),
      },
      orderBy: { createdAt: "desc" },
    });

    const selfLiked = userId
      ? await prisma.like.count({
          where: {
            likeableType: req.query.likeableType as string,
            likeableId: Number(req.query.likeableId),
            userId,
          },
          orderBy: { createdAt: "desc" },
        })
      : 0;

    return res.status(200).json({ count, liked: selfLiked > 0 });
  } else if (req.method === "POST") {
    const { body } = req;

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const selfLiked = await prisma.like.findFirst({
      where: {
        likeableType: req.body.likeableType as string,
        likeableId: Number(req.body.likeableId),
        userId,
      },
      orderBy: { createdAt: "desc" },
    });

    if (selfLiked) {
      await prisma.like.delete({ where: { id: selfLiked.id } });
    } else {
      await prisma.like.create({ data: { ...body, userId } });
    }

    return res.status(201).json({ message: "Created" });
  } else {
    res.status(412).json({ message: "Invalid method" });
  }
}

export default withAuth(likesIndex as any);
