import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
//import { loadPDFKnowledge } from "./pdf.service.js";
import { buildPrompt } from "./prompt.service.js";
//import { retrieveRelevantChunks } from "./retrieval.service.js";
import {
    getConversation,
    addMessage,
} from "./conversation.service.js";
import { createEmbedding } from "./embedding.service.js";
import { searchVectors } from "./vector.service.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(question, sessionId, retries = 3) {
    for (let i = 0; i < retries; i++){

        try {
            //const pdfText = await loadPDFKnowledge();
            /*const pdfKnowledge = retrieveRelevantChunks(
                pdfText,
                question
            );*/
            const questionEmbedding =
                await createEmbedding(question);

            const relevantChunks =
                searchVectors(questionEmbedding);

            const pdfKnowledge =
                relevantChunks.join("\n\n");
            /** */

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

            if (error.status !== 503 || i == retries -1) {
                throw error;
            }
            console.log(`Retry ${i + 1}/${retries}...`);

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}