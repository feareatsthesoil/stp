import { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "../../../utils/prisma"

export default async function boardsIndex(req: NextApiRequest, res: NextApiResponse) {

    const data = await prisma.boards.findMany({
        where: {},
        orderBy: { name: "asc" }
    })

    return res.status(200).json(data)
}