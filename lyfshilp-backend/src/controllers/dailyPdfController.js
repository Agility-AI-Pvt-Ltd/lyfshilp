import prisma from "../prismaClient.js";
import { sendMailToAdmins, sendMailToUser } from "../utils/sendMail.js";

export const createDailyPdfRequest = async (req, res) => {
  try {
    const { name, phone, email, courses } = req.body;

    if (!name || !phone || !email || !courses?.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const entry = await prisma.dailyPdfRequest.create({
      data: {
        name,
        phone,
        email,
        courses: courses.join(","), // array → string
      },
    });

    // 📩 mail to user
    await sendMailToUser({
      email,
      name,
      formName: "Daily PDF Subscription",
    });

    // 📩 mail to admins
    await sendMailToAdmins({
      formName: "Daily PDF Subscription",
      name,
      email,
      formData: { name, phone, email, courses },
      meta: {
        path: req.originalUrl,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
    });

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    console.error("Daily PDF Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
