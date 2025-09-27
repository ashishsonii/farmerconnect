import express from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Example protected route
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.id}, you accessed the dashboard!`,
    success: true
  });
});


export default router;
