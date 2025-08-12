import { google } from "googleapis";

export async function createEvent({title, description, start, durationMins}:{title:string;description:string;start:Date;durationMins:number;}) {
  const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const end = new Date(start.getTime() + durationMins*60000);
  const res = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    requestBody: { summary: title, description, start:{dateTime:start.toISOString()}, end:{dateTime:end.toISOString()} }
  });
  return { id: res.data.id, htmlLink: res.data.htmlLink };
}
