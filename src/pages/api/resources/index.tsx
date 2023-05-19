import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

export default async function resourcesIndex(req: NextApiRequest, res: NextApiResponse) {
    const client = new PrismaClient()
    const data = await client.resource.findMany({
        where: {},
        orderBy: { name: "asc" }
    })

    return res.status(200).json(data)
}