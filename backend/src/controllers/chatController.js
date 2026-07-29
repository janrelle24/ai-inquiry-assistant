import { generateResponse } from "../services/gemini.service.js";

export const chat = async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required.",
            });
        }

        const reply = await generateResponse(
            message,
            sessionId
        );

        res.status(200).json({
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
};