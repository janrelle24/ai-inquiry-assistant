import systemPrompt from "../prompts/systemPrompt.js";

export function buildPrompt(pdfKnowledge, conversation, question) {
    return `
${systemPrompt}

=========================
KNOWLEDGE BASE
=========================

${pdfKnowledge}

=========================
CONVERSATION
=========================

${conversation}

=========================
USER QUESTION
=========================

${question}
`;
}