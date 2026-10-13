import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
    timeout: 30000,
});

export const sendChatMessage = async (message, sessionId) => {
    try {
        const response = await API.post("/chat", {
            message, sessionId
        });

        return response.data;
    } catch (error) {
        console.log("Backend Error:");
        console.log(error.response?.data);
        throw error;
    }
};