import express from "express";
import {
  submitPartnerSchoolForm,
  getAllPartnerSchoolForms,
  addPartnerSchoolForm,
  updatePartnerSchoolForm,
  deletePartnerSchoolForm,
} from "../controllers/partnerSchoolController.js";

const router = express.Router();

router.post("/submit", submitPartnerSchoolForm);     // Public form submit
router.get("/", getAllPartnerSchoolForms);           // Admin fetch all
router.post("/admin/add", addPartnerSchoolForm);     // Admin add manually
router.put("/:id", updatePartnerSchoolForm);         // Admin update
router.delete("/:id", deletePartnerSchoolForm);      // Admin delete

export default router;
