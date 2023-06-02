import { NextApiResponse } from "next";
import { withAuth } from "@clerk/nextjs/api";
import { google } from "googleapis";

const EventUpdate = async (req: any, res: NextApiResponse) => {
    const jwt = new google.auth.JWT(
        process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        undefined,
        (process.env.GOOGLE_CLOUD_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/calendar"]
    );

    const calendar = google.calendar({ auth: jwt, version: "v3" });
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    try {
        const response = await calendar.events.list({
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = response.data.items;
        if (events && events.length) {
            const nextEvent = events[0];
            return res.status(200).json(nextEvent);
        } else {
            return res.status(404).json({ message: "No upcoming events found" });
        }
    } catch (error) {
        console.error("Google API error", error);
        return res.status(500).json({ message: "Error fetching events" });
    }
};

export default withAuth(EventUpdate);
