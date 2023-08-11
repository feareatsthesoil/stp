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
// import { NextResponse } from "next/server";

// export const config = {
//   runtime: "edge",
// };

// export default async (req: Request) => {
//   const mockCalendarData = [
//     {
//       id: 1,
//       userId: "user_2OnOOhfZCTAy1YQ2SofYVjlPq7k",
//       name: "title",
//       type: "in-person",
//       description: "content",
//       starts_at: new Date().toISOString(),
//     },
//     {
//       id: 2,
//       userId: "user_2OnOOhfZCTAy1YQ2SofYVjlPq7k",
//       name: "title",
//       type: "in-person",
//       description: "content",
//       website: "stp.world",
//       email: "test@gmail.com",
//       address: "4403 Park Blvd. San Diego CA",
//       starts_at: new Date().toISOString(),
//       ends_at: new Date().toISOString(),
//     },
//   ];

//   return NextResponse.json(mockCalendarData);
// };
