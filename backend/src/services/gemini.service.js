import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { loadKnowledge } from "./knowledge.service.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt) {
    try {
        const knowledge = loadKnowledge(prompt);
        const fullPrompt = `You are E-Tanong AI.

            Answer ONLY using the information below.

            If the answer is not found, politely say:

            "I don't have information about that yet"

            Knowledge Base:
            
            ${knowledge}

            User Question :

            ${prompt}
            `;
            const response = await ai.models.generateContent({
                model: "gemini-flash-latest",
                contents: fullPrompt,
            });

            return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}