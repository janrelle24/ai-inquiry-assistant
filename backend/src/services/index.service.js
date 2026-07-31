import { knowledgeCache } from "./cache.service.js";
import { loadPDFKnowledge } from "./pdf.service.js";
import { chunkText } from "./chunk.service.js";
import { createEmbedding } from "./embedding.service.js";

export async function buildKnowledgeIndex() {
    if (knowledgeCache.indexed) {
        console.log("⚡ Knowledge index already built.");
        return;
    }
    const pdfText = await loadPDFKnowledge();
    const chunks = chunkText(pdfText);

    knowledgeCache.chunks = chunks;
    console.log(`📄 ${chunks.length} chunks created.`);
    knowledgeCache.embeddings = [];
    for (const chunk of chunks) {
        const embedding = await createEmbedding(chunk);
        knowledgeCache.embeddings.push(embedding);
    }
    knowledgeCache.indexed = true;
    console.log("✅ Knowledge index built.");
}