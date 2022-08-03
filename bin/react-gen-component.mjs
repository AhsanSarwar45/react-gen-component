#! /usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import minimist from "minimist";

import { component, barrel, type } from "../templates/fileTemplate.mjs";
import { toCamelCase, toKebabCase, toPascalCase } from "../utility/case.mjs";

const cases = {
  camel: toCamelCase,
  kebab: toKebabCase,
  pascal: toPascalCase
}

// Grab component name from terminal argument
const [name] = process.argv.slice(2);
if (!name) {
  console.log(chalk.red("You must include a component name!"));
  process.exit(1);
}

const argv = minimist(process.argv.slice(3));

// console.log(argv)

argv.case = argv.case || "camel";

if (!(argv.case in cases)) {
  console.log(chalk.bold.blue('--case'), chalk.red('must be one of the following:'), chalk.bold.green(`${Object.keys(cases).join(" ")}`));
  process.exit(1);
}

const isTypescript = argv.typescript || argv.ts;

const reactFileExtension = isTypescript ? "tsx" : "jsx";
const fileExtension = isTypescript ? "ts" : "js";

// Set default component directory if not specified
const componentsDir = argv.dir || "./components";

// Create component directory if it doesn't exist
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir);
}

const componentName = toPascalCase(name);
const fileName = cases[argv.case](name);

const dir = `${componentsDir}/${fileName}`;

// Throw an error if the component's folder already exists
if (fs.existsSync(dir)) {
  console.error(chalk.red("A component with that name already exists!"));
  process.exit(1);
}

// Create the folder
fs.mkdirSync(dir);

const writeFileErrorHandler = (err) => {
  if (err) {
    throw err;
  }
};

// Create the component file - my-component.tsx
fs.writeFile(
  `${dir}/${fileName}.${reactFileExtension}`,
  component(componentName, isTypescript),
  writeFileErrorHandler
);

// Create the type file - types.ts
isTypescript && fs.writeFile(`${dir}/types.ts`, type(componentName), writeFileErrorHandler);

// Create the barrel file - index.ts
fs.writeFile(
  `${dir}/index.${fileExtension}`,
  barrel(componentName, fileName, isTypescript),
  writeFileErrorHandler
);

console.log(`The ${componentName} component has been created successfully! 🎉`);
