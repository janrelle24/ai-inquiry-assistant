import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "./prompt.service.js";
import {
    getConversation,
    addMessage,
} from "./conversation.service.js";
import { createEmbedding } from "./embedding.service.js";
import { searchVectors } from "./vector.service.js";
import {
    limitKnowledge,
    limitConversation,
} from "./context.service.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(question, sessionId, retries = 3) {
    for (let i = 0; i < retries; i++){

        try {
            const questionEmbedding =
                await createEmbedding(question);

            const relevantChunks =
                searchVectors(questionEmbedding);
            /**
            console.log("Relevant Chunks:", relevantChunks);
            console.log("Type:", typeof relevantChunks);
            console.log("Is Array:", Array.isArray(relevantChunks));
            */
            const pdfKnowledge = limitKnowledge(relevantChunks.join("\n\n"));

            const history = getConversation(sessionId);
            const conversation = limitConversation(
                history
                    .map(
                        (m) =>
                            `${m.role.toUpperCase()}:
                ${m.content}`
                    )
                    .join("\n\n")
            );

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
            const status = error.status;
            // Temporary Gemini service problem
            if(status === 503){
                if(i === retries -1){
                    throw error;
                }
                console.log(`Gemini unavailable. Retry ${i + 1}/${retries}...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;
            }
            // Gemini rate limit / quota
            if (status === 429) {

                const rateLimitError = new Error(
                    "The AI service is temporarily busy. Please try again later."
                );

                rateLimitError.status = 429;

                throw rateLimitError;
            }
            // Invalid request
            if (status === 400) {

                const requestError = new Error(
                    "The AI request was invalid."
                );

                requestError.status = 400;

                throw requestError;
            }
            // Authentication / permission
            if (status === 401 || status === 403) {

                const authError = new Error(
                    "The AI service authentication failed."
                );

                authError.status = status;

                throw authError;
            }
            // Unknown error
            throw error;
        }
    }
}  