import fs from "fs";
import path from "path";

const knowledgeFolder = path.join(process.cwd(), "knowledge");

export function loadKnowledge(question="") {
    const files = fs.readdirSync(knowledgeFolder);

    let selectedKnowledge = "";
    const lowerQuestion = question.toLowerCase();

    for (const file of files) {
        const fileName = file.toLowerCase();

        if(lowerQuestion.includes("etanong") && fileName.includes("etanong")){
            selectedKnowledge += fs.readFileSync(
                path.join(knowledgeFolder, file),
                "utf8"
            );
        }
        else if(lowerQuestion.includes("hospitalbill") && fileName.includes("hospitalbill")){
            selectedKnowledge += fs.readFileSync(
                path.join(knowledgeFolder, file),
                "utf8"
            );
        }
        else if(lowerQuestion.includes("medicine") && fileName.includes("medicine")){
            selectedKnowledge += fs.readFileSync(
                path.join(knowledgeFolder, file),
                "utf8"
            );
        }
        
    }

    return selectedKnowledge;
}