import { prisma } from "@/utils/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export async function POST(req: any, res: any) {
  const request = req as NextApiRequest;

  const { userId } = getAuth(request);
  if (!userId) {
    return Response.json({ message: "Not logged in" }, { status: 401 });
  }

  const { body } = request;
  const { id, ...rest } = body;

  await prisma.contacts.create({
    data: { ...rest, display: body.profile ? body.display : true, userId },
  });

  return Response.json({ message: "Inserted successfully" }, { status: 200 });
}
