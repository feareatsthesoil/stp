import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"


async function meta(req: any, res: NextApiResponse) {
  
  const {userId} = req.auth
  
  const client = new PrismaClient();
  const contactInfo = await client.contacts.findFirst({where: {userId:userId ?? "NON EXISTENT USER", profile: true}})
  //await insertDirectoryData(body)
  return res.status(200).json({contactInfo,  message: "queried succesfully", user: userId })
}
export default withAuth(meta)