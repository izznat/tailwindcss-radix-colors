import * as fs from "node:fs";

try {
    const stylesheets = fs.globSync("*.css");

    for (const stylesheet of stylesheets) {
        fs.rmSync(stylesheet);
    }
} catch (error) {
    console.error(error);
}
