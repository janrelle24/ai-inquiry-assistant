import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";

const documentsFolder = path.join(process.cwd(), "documents");

export async function loadPDFKnowledge() {

    const files = fs.readdirSync(documentsFolder);

    let knowledge = "";

    for (const file of files) {

        if (!file.endsWith(".pdf")) continue;

        const buffer = fs.readFileSync(
            path.join(documentsFolder, file)
        );

        const parser = new PDFParse({
            data: buffer
        });

        const result = await parser.getText();

        knowledge += "\n";
        knowledge += data.text;

        await parser.destroy();
    }

    return knowledge;
}