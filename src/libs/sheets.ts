//import { google } from "googleapis"
//import { DirectoryRow, CalendarRow } from "../types"

export default {}
// export async function getCalendarData() {
//   try {
//     const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
//     const jwt = new google.auth.JWT(
//       process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
//       undefined,
//       (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
//       target
//     )

//     const sheets = google.sheets({ version: "v4", auth: jwt })
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Calendar Output!A2:N",
//     })

//     const rows = response.data.values as Array<Array<string>>
//     if (rows.length) {
//       return rows
//         .map((row) => ({
//           name: row[1],
//           type: row[2],
//           start_date: row[5],
//           start_time: row[7],
//           end_date: row[6],
//           end_time: row[8],
//           email: row[10],
//           description: row[11] ? row[11] : "",
//           location: row[3],
//           approved: row[12] ? row[12] : "N",
//           id: row[13] ? row[13] : "NA",
//         }))
//         .filter((row) => {
//           return row.approved === "Y"
//         })
//     }
//   } catch (err) {
//     console.log(err)
//   }
//   return []
// }

// export async function getDirectoryData(): Promise<DirectoryRow[]> {
//   try {
//     const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
//     const jwt = new google.auth.JWT(
//       process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
//       undefined,
//       (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
//       target
//     )

//     const sheets = google.sheets({ version: "v4", auth: jwt })
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: "Directory Output!A2:J",
//     })

//     const rows = response.data.values as Array<Array<string>>

//     if (rows.length) {
//       return rows
//         .map((row) => ({
//           timestamp: row[0] ?? null,
//           name: row[1] ?? null,
//           category: row[2] ?? null,
//           address: row[3] ?? null,
//           website: row[4] ?? null,
//           email: row[5] ?? null,
//           phone: row[6] ?? null,
//           description: row[7] ?? null,
//           approved: row[8] ? row[8] : "N"
//         }))
//         .filter((row) => {
//           return row.approved === "Y"
//         })
//     }
//   } catch (err) {
//     console.log(err)
//   }
//   return []
// }

// export async function insertDirectoryData(row: DirectoryRow) {
//   try {
//     const target = ["https://www.googleapis.com/auth/spreadsheets"]
//     const jwt = new google.auth.JWT(
//       process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
//       undefined,
//       (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
//       target
//     )

//     const data = [new Date(), row.name, row.category, row.address, row.website, row.email, row.phone, row.description]


//     const spreadsheetApp = google.sheets({ version: "v4", auth: jwt })
//     const spreadsheet = await spreadsheetApp.spreadsheets.values.append({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       valueInputOption: "USER_ENTERED",
//       range: "Directory Input!A:H",
//       requestBody: { values: [data] }

//     })

//   } catch (err) {
//     console.log(err)
//   }
//   return []
// }


// // export async function insertCalendarData(row: CalendarRow) {
// //   try {
// //     const target = ["https://www.googleapis.com/auth/spreadsheets"]
// //     const jwt = new google.auth.JWT(
// //       process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
// //       undefined,
// //       (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
// //       target
// //     )

// //     const data = [new Date(), row.name, row.type, row.location, row.website, row.start_date, row.end_date, row.start_time, row.end_time, row.phone, row.email, row.description]


// //     const spreadsheetApp = google.sheets({ version: "v4", auth: jwt })
// //     const spreadsheet = await spreadsheetApp.spreadsheets.values.append({
// //       spreadsheetId: process.env.SPREADSHEET_ID,
// //       valueInputOption: "USER_ENTERED",
// //       range: "Calendar Input!A:L",
// //       requestBody: { values: [data] }

// //     })

// //   } catch (err) {
// //     console.log(err)
// //   }
// //   return []
// // }
