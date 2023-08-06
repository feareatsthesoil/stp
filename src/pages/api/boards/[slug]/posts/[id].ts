import { withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from "next";
import { moderate } from "../../../../../utils/openai";
import { prisma } from "../../../../../utils/prisma";
import { getUserData } from "../../../../../utils/userData";

export async function postGet(req: any, res: NextApiResponse) {
  const { id } = req.query;
  const { userId } = req.auth;

  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(id) },
  });

  if (req.method === "GET") {
    let postData: any = {
      id: data.id,
      title: data.title,
      content: data.content,
      attachments: data.attachments,
      boardId: data.boardId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      anon: data.anon,
      uploadDetails: data.uploadDetails,
      isAuthor: req.auth.userId === data.userId,
    };
    if (!data.anon) {
      const user = await getUserData(data.userId);
      const { firstName, lastName, profileImageUrl } = user || {};
      postData.user = { firstName, lastName, profileImageUrl };
    }
    return res.status(200).json(postData);
  } else if (req.method === "PUT") {
    if (userId !== data.userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to do this" });
    }

    const { isAuthor, ...body } = req.body;

    let result = await moderate(body.content!);

    if (result.flagged) {
      return res.status(400).json({ message: "Inappropriate comment" });
    }

    result = await moderate(body.title!);

    if (result.flagged) {
      return res.status(400).json({ message: "Inappropriate title" });
    }

    const dataNew = await prisma.post.update({
      where: { id: data.id },
      data: { ...body },
    });

    return res.status(200).json(dataNew);
  } else if (req.method === "DELETE") {
    if (userId !== data.userId) {
      return res
        .status(400)
        .json({ message: "You are not authorized to do this" });
    }
    await prisma.post.delete({ where: { id: Number(req.query.id) } });
    return res.status(200).json({ message: "Deleted" });
  }
}

export default withAuth(postGet);
