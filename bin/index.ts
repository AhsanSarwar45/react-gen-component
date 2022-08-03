const chalk = require("chalk");
const fs = require("fs");
const minimist = require("minimist");

const { component, barrel, type } = require("../templates/fileTemplate");
const { toCamelCase, toKebabCase, toPascalCase } = require("../utility/case");
const defaultArgs = require("../defaultArgs.json");

type caseModifier = (str: string) => string;

interface Cases {
    [key: string]: caseModifier;
}

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

const argv = minimist(process.argv.slice(3));

// console.log(argv)

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
    console.error(chalk.red("A component with that name already exists!"));
    process.exit(1);
}

// Create the folder
fs.mkdirSync(dir, { recursive: true });

const writeFileErrorHandler = (err: Error | null) => {
    if (err) {
        throw err;
    }
};

// Create the component file - my-component.tsx
fs.writeFile(
    `${dir}/${componentFileName}.${reactFileExtension}`,
    component(componentName, isTypescript),
    writeFileErrorHandler
);

// Create the type file - types.ts
isTypescript &&
    fs.writeFile(`${dir}/types.ts`, type(componentName), writeFileErrorHandler);

// Create the barrel file - index.ts
fs.writeFile(
    `${dir}/index.${fileExtension}`,
    barrel(componentName, componentFileName, isTypescript),
    writeFileErrorHandler
);

console.log(`The ${componentName} component has been created successfully! 🎉`);
