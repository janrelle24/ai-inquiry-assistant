const MAX_KNOWLEDGE_CHARS = 12000;
const MAX_CONVERSATION_CHARS = 8000;

export function limitKnowledge(text) {
    if (!text) return "";

    return text.slice(0, MAX_KNOWLEDGE_CHARS);
}

export function limitConversation(text) {
    if (!text) return "";

    return text.slice(-MAX_CONVERSATION_CHARS);
}