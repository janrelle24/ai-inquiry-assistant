import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function createEmbedding(text) {
    try {

        const response = await ai.models.embedContent({
            model: "gemini-embedding-2",
            contents: text,
        });

        //console.dir(response, { depth: null });

        return response.embeddings[0].values;

    } catch (error) {

        console.error("Embedding Error:", error);
        throw error;

    }
}