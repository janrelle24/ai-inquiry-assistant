import { getKnowledgeIndex } from "../data/knowledgeIndex.js";

export function searchKnowledge(question) {

    const q = question.toLowerCase();

    return getKnowledgeIndex()
        .filter(doc =>
            doc.content.toLowerCase().includes(q) ||
            doc.filename.toLowerCase().includes(q)
        )
        .map(doc => doc.content)
        .join("\n");
}