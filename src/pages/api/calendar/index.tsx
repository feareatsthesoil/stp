import { Client } from "@planetscale/database";
import { NextResponse } from "next/server";

const db = new Client({
  url: process.env["DATABASE_URL"],
});
export const config = {
  runtime: "edge",
};

export default async (req: Request) => {
  const conn = await db.connection();
  const calendarData = await conn.execute(
    "SELECT * FROM Events WHERE starts_at > (NOW() - INTERVAL 1 DAY) ORDER BY starts_at ASC"
  );
  return NextResponse.json(calendarData.rows);
};
