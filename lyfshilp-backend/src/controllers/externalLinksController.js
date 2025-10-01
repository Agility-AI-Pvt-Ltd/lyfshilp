// src/controllers/externalLinksController.js
import prisma from "../prismaClient.js";

export async function listExternalLinks(req, res) {
  const links = await prisma.externalLink.findMany({ orderBy: { createdAt: "asc" } });
  res.json({ data: links });
}
