import { NextApiResponse } from "next";
import { withAuth } from "@clerk/nextjs/api";
import { prisma } from "../../../utils/prisma";
import { google } from "googleapis";

export default withAuth(async (req: any, res: NextApiResponse) => {
  const { body } = req;

  await prisma.events.create({
    data: {
      ...body,
      starts_at: new Date(body.starts_at),
      ends_at: body.ends_at === "" || !body.ends_at ? undefined : new Date(body.ends_at),
      userId: req.auth.userId,
      approved: true,
    },
  });
  const target = ["https://www.googleapis.com/auth/calendar"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_CLOUD_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    target
  );

  const calendar = google.calendar({ auth: jwt, version: "v3" });
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: body.name,
      description: `
  ${body.description}
  Email: ${body.email}
  Phone: ${body.phone}
  `,
      location: body.address,
      start: { dateTime: body.starts_at },
      end: { dateTime: body.ends_at ?? body.starts_at },
    },
  });
  return res.status(200).json({ message: "inserted succesfully" });
});
