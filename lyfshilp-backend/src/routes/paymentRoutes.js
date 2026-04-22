import { Router } from "express";
import { createWebinarOrder } from "../controllers/paymentController.js";

const router = Router();

router.post("/webinar-order", createWebinarOrder);

export default router;
