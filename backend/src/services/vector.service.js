import { knowledgeCache } from "./cache.service.js";

export function cosineSimilarity(a, b) {

    let dot = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    return dot / (magnitudeA * magnitudeB);
}

export function searchVectors(questionEmbedding) {
    const scores = [];
    for (let i = 0; i < knowledgeCache.embeddings.length; i++) {
        const score = cosineSimilarity(
            questionEmbedding,
            knowledgeCache.embeddings[i]
        );
        scores.push({
            chunk: knowledgeCache.chunks[i],
            score,
        });
    }
    scores.sort((a, b) => b.score - a.score);
    return scores
        .filter(item => item.score >= 0.70)
        .slice(0, 5)
        .map(item => item.chunk);

}