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
        //const reply = "Backend test successful!";

        res.json({
            success: true,
            reply,
        });
    } catch (error) {
        console.error(error);
    
        res.status(500).json({
            success: false,
            message: error.message,
            
        });
    }
});

export default router;