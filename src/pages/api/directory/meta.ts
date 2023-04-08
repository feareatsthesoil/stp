import { withAuth } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"
import { NextApiResponse } from "next"


async function meta(req: any, res: NextApiResponse) {
  
  const {userId} = req.auth
  if(!userId)
    return res.status(401).json({message: "Not logged in"});
  const client = new PrismaClient();
  const contactInfo = await client.contacts.findFirst({where: {userId:userId ?? "Non existent user", profile: true}})
  const purchase = await client.purchases.findFirst({where: {userId: userId, expiryDate: {gte: new Date()} }})
  return res.status(200).json({contactInfo, purchase,  message: "Queried succesfully", user: userId })
}
export default withAuth(meta)