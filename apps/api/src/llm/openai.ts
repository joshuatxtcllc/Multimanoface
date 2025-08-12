import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function chat(system: string, user: string): Promise<string> {
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini", // swap to your preferred model
    messages: [{ role:"system", content: system }, { role:"user", content: user }],
    temperature: 0.2
  });
  return resp.choices[0].message.content || "";
}
