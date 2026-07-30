import { chunkText } from "./chunk.service.js";
export function retrieveRelevantChunks(pdfText, question) {
    const chunks = chunkText(pdfText);

    const keywords = question
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2); // ignore tiny words

    const scored = chunks.map(chunk => {

        let score = 0;

        const lower = chunk.toLowerCase();

        for (const word of keywords) {

            if (lower.includes(word)) {
                score++;
            }
        }
        return {
            chunk,
            score,
        };
    });
    const relevant = scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.chunk);

    // Fallback if nothing matches
    if (relevant.length === 0) {
        return pdfText;
    }
    
    return relevant.join("\n\n");
}