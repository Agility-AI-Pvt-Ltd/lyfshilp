import prisma from "../prismaClient.js";

export const createApplication = async (req, res) => {
  try {
    const { fullName, phone, email, about, resumeUrl, jobId, jobTitle } = req.body;

    const application = await prisma.application.create({
      data: { fullName, phone, email, about, resumeUrl, jobId, jobTitle },
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
