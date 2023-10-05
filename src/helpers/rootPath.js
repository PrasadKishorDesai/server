import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const getAppRootDir = () => {
    let currentDir = __dirname;
    while(!fs.existsSync(path.join(currentDir, "package.json"))) {
        currentDir = path.join(currentDir, "..");
    }
    return currentDir;
};
