import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";

const documentsFolder = path.join(process.cwd(), "documents");
let cachedKnowledge = null;

export async function loadPDFKnowledge() {

    if (cachedKnowledge) {
        console.log("⚡ Using cached PDF knowledge.");
        return cachedKnowledge;
    }

    const files = fs.
        readdirSync(documentsFolder)
        .filter(file => file.endsWith(".pdf"));

    if (files.length === 0) {
        throw new Error("No PDF documents found.");
    }

    let knowledge = "";

    for (const file of files) {

        try {
            const buffer = fs.readFileSync(
                path.join(documentsFolder, file)
            );
    
            const parser = new PDFParse({
                data: buffer
            });
    
            const result = await parser.getText();
            console.log(`📄 Loaded ${file}`);
            knowledge += "\n";
            knowledge += result.text;
    
            await parser.destroy();
        }catch(error){
            console.error(`Failed to read ${file}`, error);
        }
        
    }
    cachedKnowledge = knowledge;
    console.log("✅ PDF knowledge loaded into memory.");

    return cachedKnowledge;
}