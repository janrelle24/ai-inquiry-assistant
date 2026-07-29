import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { loadPDFKnowledge } from "./pdf.service.js";
import { buildPrompt } from "./prompt.service.js";
import {
    getConversation,
    addMessage,
} from "./conversation.service.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(question, sessionId) {
    try {
        const pdfKnowledge = await loadPDFKnowledge();

        //
        const history = getConversation(sessionId);
        const conversation = history
            .map(
                (m) =>
                    `${m.role.toUpperCase()}:
        ${m.content}`
            )
            .join("\n\n");

        const fullPrompt = buildPrompt(
            pdfKnowledge,
            conversation,
            question
        );
        
        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: fullPrompt,
        });

        const reply = response.text;

        addMessage(
            sessionId,
            "user",
            question
        );
        
        addMessage(
            sessionId,
            "assistant",
            response.text
        );

        return reply;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}