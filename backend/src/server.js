import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes.js";
import { createEmbedding } from "./services/embedding.service.js";
import { buildKnowledgeIndex } from "./services/index.service.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Tanong AI Backend is running 🚀",
    });
});

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

const embedding = await createEmbedding(
    "Healthcare assistance requirements"
);

console.log(embedding.length);
console.log(embedding.slice(0, 10));

await buildKnowledgeIndex();

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
