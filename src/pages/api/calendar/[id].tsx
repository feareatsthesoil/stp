import { NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { withAuth } from "@clerk/nextjs/api"
import { google } from "googleapis"

const EventUpdate = (async (req: any, res: NextApiResponse) => {
    const { id } = req.query
    const { userId } = req.auth
    const { id: _id, ...data } = req.body
    const { body } = req

    if (!id) {
        return res.status(404).json({ message: "ID not specifed" })
    }
    const client = new PrismaClient()
    const calendarData = await client.events.findFirstOrThrow({ where: { id: Number(id) } })

    const target = ["https://www.googleapis.com/auth/calendar"]
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        undefined,
        (process.env.GOOGLE_CLOUD_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
    )

    const calendar = google.calendar({ auth: jwt, version: "v3" })
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    if (req.method === "PUT") {
        if (userId !== calendarData.userId
        ) {
            res.status(400).json({ message: "You are not authorized to do this" })
        }
        await client.events.update({ where: { id: Number(id) }, data })
        if (calendarData.calendarEventId) {
            const gcalEvent = await calendar.events.update({
                calendarId, eventId: calendarData.calendarEventId!, requestBody: {
                    summary: body.name, description: `
                ${body.description}
                Email: ${body.email}
                Phone: ${body.phone}
                `, location: body.address, start: { dateTime: body.starts_at }, end: { dateTime: body.ends_at ?? body.starts_at }
                }
            })
        }
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