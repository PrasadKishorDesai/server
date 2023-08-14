const fs = require("fs");
const path = require("path");

function getAppRootDir () {
    let currentDir = __dirname;
    while(!fs.existsSync(path.join(currentDir, "package.json"))) {
        currentDir = path.join(currentDir, "..");
    }
    return currentDir;
}

module.exports = getAppRootDir;