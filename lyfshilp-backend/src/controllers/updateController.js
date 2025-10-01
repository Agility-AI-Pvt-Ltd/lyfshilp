import prisma from "../config/prisma.js";

export const getUpdates = async (req, res) => {
  const updates = await prisma.dailyUpdate.findMany();
  res.json(updates);
};

export const createUpdate = async (req, res) => {
  const { title, content } = req.body;
  const update = await prisma.dailyUpdate.create({
    data: { title, content },
  });
  res.status(201).json({ success: true, update });
};
