import express from "express";
import { generateResponse } from "../services/gemini.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
        return res.status(400).json({
            success: false,
            message: "Message is required",
        });
        }

        const reply = await generateResponse(message);

        res.json({
        success: true,
        reply,
        });
    } catch (error) {
        console.error("===== GEMINI ERROR =====");
        console.error(error);
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        console.error("Response:", error.response?.data);
        console.error("========================");
    
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
});
/*
router.post("/", (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    res.json({
        success: true,
        body: req.body
    });
});*/

export default router;