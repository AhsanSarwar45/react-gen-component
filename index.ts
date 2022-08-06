import chalk from "chalk";
import path from "path";
import fs from "fs";
import minimist from "minimist";
import findConfig from "find-config";

import { getFileNames } from "./utility/files";
import defaultArgs from "./defaultArgs";
import { toCamelCase, toKebabCase, toPascalCase } from "./utility/case";
import { Arguments } from "./types/arguments";
import { Cases } from "./types/cases";
import displayHelp from "./utility/help";

const cases: Cases = {
    camel: toCamelCase,
    kebab: toKebabCase,
    pascal: toPascalCase,
};

const configPath = findConfig("gen.config.json");

let defaultArguments = defaultArgs;

if (configPath) {
    const config = require(configPath);
    defaultArguments = { ...defaultArguments, ...config };
}

const argv: Arguments = minimist(process.argv.slice(2), {
    default: defaultArguments,
    boolean: ["typescript"],
    alias: {
        case: ["c"],
        "comp-case": ["cc"],
        directory: ["d", "dir"],
        template: ["t"],
        "template-dir": ["td"],
        typescript: ["ts"],
        help: ["h"],
    },
});

if (argv.help) {
    displayHelp();
    process.exit(0);
}

// Grab component name from terminal argument
const name = argv._[0];
if (!name) {
    console.log(chalk.red("You must include a component name!"));
    process.exit(1);
}

const fileCase = argv.case || "";
const componentFileCase = argv["comp-case"] || fileCase;

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

const isTypescript = argv.typescript;

const reactFileExtension = isTypescript ? "tsx" : "jsx";
const fileExtension = isTypescript ? "ts" : "js";

// Set default component directory if not specified
const componentsDir = argv.directory;

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

const template = argv.template || "";

const customTemplatesDirArg = argv["template-dir"];
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
    const templateFilePath = `${templatePath}/${dirent.name}`;
    // Dynamically import the template function
    const templateCreator = require(templateFilePath).default;

    if (typeof templateCreator !== "function") {
        console.log(
            chalk.blue(`${templateFilePath}`),
            chalk.red("does not export a function!")
        );
        process.exit(1);
    }

    dirent.name = dirent.name.replace(/\.[^/.]+$/, "");

    const templateFileExtension = path.extname(dirent.name);

    let fileExtension = "";

    if (templateFileExtension === ".tsx" || templateFileExtension === ".jsx") {
        fileExtension = isTypescript ? ".tsx" : ".jsx";
    } else if (
        templateFileExtension === ".ts" ||
        templateFileExtension === ".js"
    ) {
        fileExtension = isTypescript ? ".ts" : ".js";
    } else {
        fileExtension = templateFileExtension;
    }

    // Replace 'component' with the component name and remove extension
    const fileName: string = dirent.name
        .replace(/component/g, componentFileName)
        .replace(/\.[^/.]+$/, fileExtension);

    const fileContent = templateCreator(
        componentName,
        componentFileName,
        isTypescript
    );

    if (typeof fileContent !== "string" && fileContent !== null) {
        console.log(
            chalk.blue(`${templateFilePath}`),
            chalk.red("does not export a function that returns a"),
            chalk.yellow("string"),
            chalk.red("or"),
            chalk.yellow("null")
        );
        process.exit(1);
    }

    if (fileContent !== null) {
        fs.writeFile(`${dir}/${fileName}`, fileContent, writeFileErrorHandler);
    }
}
templateDir.closeSync();

console.log(
    chalk.bold.blue(componentName),
    chalk.green("component has been created successfully! 🎉")
);
