import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

const documentsFolder = path.join(process.cwd(), "documents");

export async function loadPDFKnowledge() {

    const files = fs.readdirSync(documentsFolder);

    let knowledge = "";

    for (const file of files) {

        if (!file.endsWith(".pdf")) continue;

        const buffer = fs.readFileSync(
            path.join(documentsFolder, file)
        );

        const data = await pdf(buffer);

        knowledge += "\n";
        knowledge += data.text;
    }

    return knowledge;
}