import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile } from "../controllers/adminController.js";
import { getAdminAppliedEvents } from "../controllers/applicationController.js";
import { verifyAdmin } from "../middlewares/authorizeAdmin.js";

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/profile", verifyAdmin, getAdminProfile);
router.get("/admin/applied-events", verifyAdmin, getAdminAppliedEvents);

export default router;