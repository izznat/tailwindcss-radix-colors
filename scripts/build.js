import * as colors from "@radix-ui/colors";
import * as fs from "node:fs";
import * as path from "node:path";

const STYLESHEET_TEMPLATE = `
/*
MIT License

Copyright (c) 2021-2022 Modulz
Copyright (c) 2022-Present WorkOS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

@theme {
/* VARIABLES */
}
`;

const NEWLINE = "\n";
const TAB = "\t";

/**
 * @param {string} name
 * @param {Record<string, string>} scales
 */
function generateStylesheet(name, scales) {
    let scalesThemeVariables = "";

    for (const scale in scales) {
        const canonicalScale = canonicalizeScale(scale);

        scalesThemeVariables += TAB;
        scalesThemeVariables += `--color-${canonicalScale}: var(--${canonicalScale});`;
        scalesThemeVariables += NEWLINE;
    }

    let stylesheet = STYLESHEET_TEMPLATE.replace(
        `/* VARIABLES */`,
        scalesThemeVariables.trimEnd(),
    ).trimStart();

    const stylesheetPath = path.resolve(import.meta.dirname, `../${name}.css`);

    try {
        fs.writeFileSync(stylesheetPath, stylesheet);
    } catch (error) {
        console.error(
            `Failed to generate the stylesheet for '${name}' color scales.`,
        );
        console.error(error);
    }
}

/**
 * @param {string} name
 * @returns {string}
 */
function canonicalizeName(name) {
    name = name.replace("P3", "");

    if (name.endsWith("A")) {
        name = name.replace("A", "-alpha");
    }

    return name;
}

/**
 * @param {string} scale
 * @returns {string}
 */
function canonicalizeScale(scale) {
    return scale.replace("A", "-a");
}

for (const [name, scales] of Object.entries(colors)) {
    if (!name.includes("P3") || name.includes("Dark")) {
        continue;
    }

    generateStylesheet(canonicalizeName(name), scales);
}
