import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

try {
    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: "Say hello in one sentence.",
    });

    console.log("AI Response:");
    console.log(response.text);
} catch (error) {
    console.error("ERROR:");
    console.error(error);
}