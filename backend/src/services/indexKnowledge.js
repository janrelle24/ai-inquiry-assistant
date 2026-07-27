import fs from "fs";
import path from "path";

const folder = path.join(process.cwd(), "knowledge");

export function buildKnowledgeIndex() {
    const files = fs.readdirSync(folder);

    return files.map(file => ({
        filename: file,
        content: fs.readFileSync(
            path.join(folder, file),
            "utf8"
        )
    }));
}