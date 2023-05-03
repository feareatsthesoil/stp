import { NextApiResponse } from "next"
import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"

async function directorySubmit(req: any, res: NextApiResponse) {
  const { body } = req
  const { userId } = req.auth
  const { id, ...rest } = body
  const client = new PrismaClient();
  await client.contacts.create({ data: { ...rest, display: body.profile ? body.display : true, userId } })
  return res.status(200).json({ message: "Inserted succesfully" })
}
export default withAuth(directorySubmit)