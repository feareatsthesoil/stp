import { NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import moment from "moment"

export default (async (req: any, res: NextApiResponse) => {
  const client = new PrismaClient()

  const calendarData = await client.events.findMany({ where: { starts_at: { gt: moment().add(-1, "days").toDate() } }, orderBy: { starts_at: "asc" } })

  return res.status(200).json(calendarData)
})