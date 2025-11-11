import prisma from "../prismaClient.js";

/**
 * 🟢 GET all podcasts
 */
export const getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await prisma.podcast.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: podcasts });
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch podcasts" });
  }
};

/**
 * 🟢 Helper: Convert YouTube URL → Embed format
 */
const toEmbedUrl = (url) => {
  if (!url) return url;
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "youtube.com/embed/");
  }
  return url;
};

/**
 * 🟢 POST: Add new podcast
 */
export const addPodcast = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnail, category } = req.body;

    // ✅ Ensure video URL is in embeddable format
    const finalUrl = toEmbedUrl(videoUrl);

    const podcast = await prisma.podcast.create({
      data: { title, description, videoUrl: finalUrl, thumbnail, category },
    });

    res.json({ success: true, data: podcast });
  } catch (err) {
    console.error("ADD error:", err);
    res.status(500).json({ success: false, message: "Failed to add podcast" });
  }
};

/**
 * 🟢 PUT: Update podcast
 */
export const updatePodcast = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, videoUrl, thumbnail, category } = req.body;

    // ✅ Convert on update too
    const finalUrl = toEmbedUrl(videoUrl);

    const podcast = await prisma.podcast.update({
      where: { id: parseInt(id) },
      data: { title, description, videoUrl: finalUrl, thumbnail, category },
    });

    res.json({ success: true, data: podcast });
  } catch (err) {
    console.error("UPDATE error:", err);
    res.status(500).json({ success: false, message: "Failed to update podcast" });
  }
};

/**
 * 🟢 DELETE podcast
 */
export const deletePodcast = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.podcast.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: "Podcast deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ success: false, message: "Failed to delete podcast" });
  }
};
