import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}