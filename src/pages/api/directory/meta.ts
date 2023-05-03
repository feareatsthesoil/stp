import { NextApiResponse } from "next"
import { withAuth, clerkClient } from "@clerk/nextjs/api";
import { PrismaClient } from "@prisma/client"

async function meta(req: any, res: NextApiResponse) {

  const { userId } = req.auth
  if (!userId)
    return res.status(401).json({ message: "Not logged in" });
  const client = new PrismaClient();
  const profile = await client.contacts.findFirst({ where: { userId: userId ?? "Non existent user", profile: true } })
  const purchase = await client.purchases.findFirst({ where: { userId: userId, expiryDate: { gte: new Date() } } })
  const user = await clerkClient.users.getUser(userId)

  const isEdu = user.emailAddresses.some(record => record.emailAddress.endsWith(".edu"))


  return res.status(200).json({ profile, purchase, message: "Queried succesfully", user: userId, isEdu, isMember: purchase || isEdu })
}
export default withAuth(meta)