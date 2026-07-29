const conversations = new Map();

/*
    Structure:

    conversations = {
        sessionId : [
            {
                role: "user",
                content: "..."
            },
            {
                role: "assistant",
                content: "..."
            }
        ]
    }
*/

const MAX_HISTORY = 10;

export function getConversation(sessionId) {
    return conversations.get(sessionId) || [];
}

export function addMessage(sessionId, role, content) {

    const history = getConversation(sessionId);

    history.push({
        role,
        content,
    });

    if (history.length > MAX_HISTORY) {
        history.shift();
    }

    conversations.set(sessionId, history);
}

export function clearConversation(sessionId) {
    conversations.delete(sessionId);
}