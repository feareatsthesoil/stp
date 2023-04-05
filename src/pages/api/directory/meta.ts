import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"


async function meta(req: any, res: NextApiResponse) {
  
  const {userId} = req.auth
  
  const client = new PrismaClient();
  const contactInfo = await client.contacts.findFirst({where: {userId:userId ?? "NON EXISTENT USER", profile: true}})
  const purchase = await client.purchases.findFirst({where: {userId: userId, expiryDate: {gte: new Date()} }})
  //await insertDirectoryData(body)
  return res.status(200).json({contactInfo, purchase,  message: "queried succesfully", user: userId })
}
export default withAuth(meta)