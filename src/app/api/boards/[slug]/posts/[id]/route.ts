import { prisma } from "@/utils/prisma";
import { getUserData } from "@/utils/userData";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(
  req: any,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = getAuth(req);
  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(id) },
  });

  let postData: any = {
    id: data.id,
    title: data.title,
    content: data.content,
    attachments: data.attachments,
    boardId: data.boardId,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    anon: data.anon,
    isAuthor: userId === data.userId,
  };
  if (!data.anon) {
    const user = await getUserData(data.userId);
    const { firstName, lastName, profileImageUrl } = user || {};
    postData.user = { firstName, lastName, profileImageUrl };
  }
  return Response.json(postData, { status: 200 });
}

export async function DELETE(
  req: any,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = getAuth(req);

  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(id) },
  });

  if (userId !== data.userId) {
    return Response.json(
      { message: "You are not authorized to do this" },
      { status: 400 }
    );
  }
  await prisma.post.delete({ where: { id: Number(id) } });
  return Response.json({ message: "Deleted" }, { status: 200 });
}

export async function PUT(
  req: any,
  { params: { id } }: { params: { id: string } }
) {
  const { userId } = getAuth(req);

  const data = await prisma.post.findFirstOrThrow({
    where: { id: Number(id) },
  });

  if (userId !== data.userId) {
    return Response.json(
      { message: "You are not authorized to do this" },
      { status: 400 }
    );
  }

  const { isAuthor, ...body } = req.body;

  const dataNew = await prisma.post.update({
    where: { id: data.id },
    data: { ...body },
  });

  return Response.json(dataNew, { status: 200 });
}
