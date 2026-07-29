import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";

const documentsFolder = path.join(process.cwd(), "documents");
let cachedKnowledge = null;

export async function loadPDFKnowledge() {

    // Return the cached text if it's already loaded
    if (cachedKnowledge) {
        return cachedKnowledge;
    }

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
        knowledge += result.text;

        await parser.destroy();
    }

    // Save the extracted text in memory
    cachedKnowledge = knowledge;

    console.log("✅ PDF knowledge loaded into memory.");

    //return knowledge;
    return cachedKnowledge;
}