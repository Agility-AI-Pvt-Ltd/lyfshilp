import express from "express";
import {
  getAllPodcasts,
  addPodcast,
  updatePodcast,
  deletePodcast,
} from "../controllers/podcastController.js";

const router = express.Router();

router.get("/all", getAllPodcasts);
router.post("/add", addPodcast);
router.put("/update/:id", updatePodcast);
router.delete("/delete/:id", deletePodcast);

export default router;
