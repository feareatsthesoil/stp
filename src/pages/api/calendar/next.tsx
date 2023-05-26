import { NextApiResponse } from "next"
// import { PrismaClient } from "@prisma/client"
import { withAuth } from "@clerk/nextjs/api"
import { google } from "googleapis"

const EventUpdate = (async (req: any, res: NextApiResponse) => {
    const { id } = req.query
    const { userId } = req.auth
    const { id: _id, ...data } = req.body
    const { body } = req

    const target = ["https://www.googleapis.com/auth/calendar"]
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        undefined,
        (process.env.GOOGLE_CLOUD_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
    )
    const calendar = google.calendar({ auth: jwt, version: "v3" })
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    });

    const events = response.data.items;
    if (events && events.length) {
        const nextEvent = events[0];
        return res.status(200).json(nextEvent);
    } else {
        return res.status(404).json({ message: "No upcoming events found" });
    }
})

export default withAuth(EventUpdate)
