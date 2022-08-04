import chalk from "chalk";
import path from "path";
import fs from "fs";
import minimist from "minimist";

import { getFileNames } from "./utility/files";
import defaultArgs from "./defaultArgs";
import { toCamelCase, toKebabCase, toPascalCase } from "./utility/case";
import { Arguments } from "./types/arguments";
import { Cases } from "./types/cases";

const cases: Cases = {
    camel: toCamelCase,
    kebab: toKebabCase,
    pascal: toPascalCase,
};

// Grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) {
    console.log(chalk.red("You must include a component name!"));
    process.exit(1);
}

const argv: Arguments = minimist(process.argv.slice(3));

// console.log(argv);

// Set default case to camel if not specified
const fileCase: string = argv.c || argv.case || defaultArgs.case;
const componentFileCase: string = argv.cc || argv["comp-case"] || fileCase;

const caseError = (cmd: string) => {
    console.log(
        chalk.bold.blue(cmd),
        chalk.red("must be one of the following:"),
        chalk.bold.green(`${Object.keys(cases).join(" ")}`)
    );
    process.exit(1);
};

if (!(fileCase in cases)) {
    caseError("--case");
}

if (!(componentFileCase in cases)) {
    caseError("--comp-case");
}

const isTypescript = argv.typescript || argv.ts;

const reactFileExtension = isTypescript ? "tsx" : "jsx";
const fileExtension = isTypescript ? "ts" : "js";

// Set default component directory if not specified
const componentsDir =
    argv.d || argv.dir || argv.directory || defaultArgs.directory;

const componentName = toPascalCase(name);
const componentFileName = cases[componentFileCase](name);
const fileName = cases[fileCase](name);

const dir = `${componentsDir}/${fileName}`;

// Throw an error if the component's folder already exists
if (fs.existsSync(dir)) {
    console.log(
        chalk.red("A directory with the name"),
        chalk.bold.blue(fileName),
        chalk.red("already exists!")
    );
    process.exit(1);
}

const writeFileErrorHandler = (err: Error | null) => {
    if (err) {
        throw err;
    }
};

const template = argv.t || argv.template || defaultArgs.template;

const customTemplatesDirArg = argv.td || argv["template-dir"];
const customTemplatesDirPath =
    customTemplatesDirArg && path.resolve(customTemplatesDirArg);

const defaultTemplatesDirPath = __dirname + "/templates";

const defaultTemplates = getFileNames(defaultTemplatesDirPath);
const customTemplates = customTemplatesDirPath
    ? getFileNames(customTemplatesDirPath)
    : [];

let templateDirPath = "";

if (customTemplatesDirPath && customTemplates.includes(template)) {
    templateDirPath = customTemplatesDirPath;
} else if (defaultTemplates.includes(template)) {
    templateDirPath = defaultTemplatesDirPath;
} else {
    console.log(
        chalk.bold.blue("--template"),
        chalk.red(`must be one of the following:`),
        chalk.bold.green(defaultTemplates.concat(customTemplates).join(" "))
    );
    process.exit(1);
}

// Create the folder
fs.mkdirSync(dir, { recursive: true });

const templatePath = `${templateDirPath}/${template}`;

const templateDir = fs.opendirSync(templatePath);
let dirent;
// Loop through all the files in the template directory
while ((dirent = templateDir.readSync()) !== null) {
    // Dynamically import the template function
    const templateCreator = require(`${templatePath}/${dirent.name}`).default;
    // Get file name without extensions
    const templateFileName: string = dirent.name.replace(/\.[^/.]+$/, "");
    const fileName =
        templateFileName === "component"
            ? `${componentFileName}.${reactFileExtension}`
            : `${templateFileName}.${fileExtension}`;
    const fileContent = templateCreator(
        componentName,
        componentFileName,
        isTypescript
    );
    if (fileContent !== null) {
        fs.writeFile(`${dir}/${fileName}`, fileContent, writeFileErrorHandler);
    }
}
templateDir.closeSync();

console.log(
    chalk.bold.blue(componentName),
    chalk.green("component has been created successfully! 🎉")
);
