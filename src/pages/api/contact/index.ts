import { createClerkClient } from "@clerk/clerk-sdk-node"

import { Clerk, withAuth } from "@clerk/nextjs/api"
import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export default withAuth(async (req: any, res: NextApiResponse)=> {
  const { body } = req


  const client = new PrismaClient()
  await client.events.create({data: {...body, starts_at: new Date(body.starts_at), ends_at: body.ends_at ==='' ?undefined: new Date(body.ends_at),userId: req.auth.userId } })
  return res.status(200).json({ message: "inserted succesfully" })
})