import { NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { withAuth } from "@clerk/nextjs/api"

const EventUpdate = (async (req: any, res: NextApiResponse) => {
    const { id } = req.query
    const { userId } = req.auth
    const { id: _id, ...data } = req.body

    if (!id) {
        return res.status(404).json({ message: "ID not specifed" })
    }
    const client = new PrismaClient()
    const calendarData = await client.events.findFirstOrThrow({ where: { id: Number(id) } })

    if (req.method === "PUT") {
        if (userId !== calendarData.userId
        ) {
            res.status(400).json({ message: "You are not authorized to do this" })
        }
        await client.events.update({ where: { id: Number(id) }, data })
        return res.status(200).json(calendarData)
    }
    if (req.method === "DELETE") {
        if (userId !== calendarData.userId
        ) {
            res.status(400).json({ message: "You are not authorized to do this" })
        }
        await client.events.delete({ where: { id: Number(id) } })
        return res.status(200).json(calendarData)
    }
    return res.status(200).json(calendarData)

})

export default withAuth(EventUpdate)