import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY! });

export async function logNotion({ title, summary }:{title:string; summary:string;}) {
  const r = await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID! },
    properties: { Name: { title: [{ text: { content: title } }] } },
    children: [{ object:"block", type:"paragraph", paragraph:{ rich_text:[{type:"text", text:{content:summary}}]}}]
  });
  return { id: r.id };
}
