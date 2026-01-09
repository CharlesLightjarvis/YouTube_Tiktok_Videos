import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createServer } from "../dist/server/server.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url = "/" } = req;

  const html = await createServer(url);

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
