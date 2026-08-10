import express from "express";
import { chat } from "../controllers/chatController.js";
import { chatRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", chatRateLimiter, chat);

export default router;