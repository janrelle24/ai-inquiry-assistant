import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import { knowledgeCache } from "./cache.service.js";

const documentsFolder = path.join(process.cwd(), "documents");

export async function loadPDFKnowledge() {

    if (knowledgeCache.loaded) {
        console.log("⚡ Using cached PDF knowledge.");
        return knowledgeCache.text;
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
    knowledgeCache.text = knowledge;
    knowledgeCache.loaded = true;
    console.log("✅ PDF knowledge loaded into memory.");

    return knowledgeCache.text;
}