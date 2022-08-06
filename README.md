# react-gen-component

A customizable cli tool that generates/scaffolds react components from templates.

```bash
npm i -g react-gen-component
```

## Table of Contents

1. [Usage](#usage)
1. [Typescript](#typescript)
1. [Custom Templates](#custom-templates)
1. [Config File](#config-file)
1. [Options](#options)

## Usage

```bash
gen-component MyComponent
# Or shorthand
gen MyComponent
```

Creates a new component:

```bash
📁 myComponent
    📄 myComponent.jsx # implementation
    📄 index.js # to export components
```

myComponent.jsx

```jsx
// External imports
import React from "react";

// Component imports

// Project imports

const MyComponent = (props) => {
    return <></>;
};

MyComponent.defaultProps = {};

export default MyComponent;
```

index.js

```js
import MyComponent from "./myComponent";

export * from "./myComponent";

export default MyComponent;
```

## Typescript

To generate typescript files instead, use the [`--typescript`](#typescript-1) or [`--ts`](#typescript-1) flag:

```bash
gen MyComponent --ts
```

Creates a new typescript component:

```bash
📁 myComponent
    📄 myComponent.tsx # implementation
    📄 index.ts # to export components and types
    📄 types.ts # for types and interfaces
```

myComponent.tsx

```jsx
// External imports
import React from "react";

// Component imports
import { MyComponentProps } from "./types";

// Project imports

const MyComponent = (props: MyComponentProps) => {
    return <></>;
};

MyComponent.defaultProps = {};

export default MyComponent;
```

index.ts

```ts
import MyComponent from "./myComponent";

export * from "./myComponent";
export * from "./types";

export default MyComponent;
```

types.ts

```ts
export interface MyComponentProps {}
```

## Custom Templates

There are a few [templates](#template) available by default. You can also create your own templates.

1. Create a custom template folder and name it anything you want.

```bash
📁 templates
```

2. Create a template folder with the name of the template. If the name is the same as one of the included templates, your custom template will be used whenever you use that name.

```bash
📁 templates
    📁 myTemplate
```

3. Add a file called `component.jsx.js` or `component.jsx.ts` to the template folder. Any occurrences of the word `component` will be replaced with the component name. The resulting file will be called `component.jsx` or `component.tsx` if the [`--typescript`](#typescript) flag has been passed.

```bash
📁 templates
    📁 myTemplate
        📄 component.jsx.js
```

4. Add any additional file you need. These files can be in typescript too.

```bash
📁 templates
    📁 myTemplate
        📄 component.jsx.js
        📄 component.stories.jsx.js
        📄 component.test.jsx.js
        📄 types.js.js
        📄 index.js.js
```

5. In each file, you need to `export default` a function that takes the following parameters:

-   `componentName : string` The name of the component you are generating.
-   `fileName : string` The name of the component file
-   `isTypescript : boolean` Has the typescript flag been passed?

The function should return a `string` or `null`.

Example:

```js
// component.jsx.js
export default (name, fileName, isTypescript) => `

const ${name} = (props${isTypescript ? `: ${name}Props` : ""}) => {
    return (<></>);
};

export default ${name};
`;
```

If you want to exclude a file conditionally, you can return `null`:

```js
// types.js.js
export default (name, fileName, isTypescript) =>
    isTypescript ? `export interface ${name}Props {}` : null;
```

6. Use your custom template using the [`template-dir`](#template-dir) and [`--template`](#template) options.

```bash
gen MyComponent --td templates --t myTemplate
```

Results in:

```bash
📁 myComponent
    📄 myComponent.jsx # myComponent.tsx if --typescript is passed
    📄 myComponent.stories.jsx
    📄 myComponent.test.jsx
    📄 index.js # index.ts if --typescript is passed
```

To avoid having to pass the template directory every time, you can use a [config file](#config-file).

## Config File

You can create a `gen.config.json` file to store your config. The script will search for the nearest config file and use that.

```json
{
    "directory": "./src/components",
    "template-dir": "./src/templates",
    "typescript": true,
    "case": "kebab"
    // ... Other parameters if needed
}
```

## Options

### `typescript`

-   `--ts` or `--typescript`: Generate typescript files.

    ```bash
    gen MyComponent --ts
    ```

### `directory`

-   `-d` or `--dir` or `--directory`: Specify components directory. Default: is `.` (directory where the script is run).

    Example:

    ```bash
    gen MyComponent --dir components
    ```

    Generates:

    ```bash
    📁 components
        📁 myComponent
            📄 myComponent.jsx # implementation
            📄 index.js # to export components
    ```

### `case`

-   `-c` or `--case`: Specify file name case.

    -   `camel` (camelCase) `default`
    -   `kebab` (kebab-case)
    -   `pascal` (PascalCase)

    Example:

    ```bash
    gen MyComponent --case kebab
    ```

    Generates:

    ```bash
    📁 my-component
        📄 my-component.jsx # implementation
        📄 index.js # to export components
    ```

### `comp-case`

-   `--cc` or `--comp-case`: Specify the component file name case. If not specified, it is the same as `--case`.

    -   `camel` (camelCase) `default`
    -   `kebab` (kebab-case)
    -   `pascal` (PascalCase)

    Example:

    ```bash
    gen MyComponent --case kebab --comp-case pascal
    ```

    Generates:

    ```bash
    📁 my-component
        📄 MyComponent.jsx # implementation
        📄 index.js # to export components
    ```

### `template`

-   `-t` or `--template`: Specify the template.

    -   `functional` `default`
    -   `class`

    Example:

    ```bash
    gen MyComponent -t class
    ```

### `template-dir`

`--td` or `--template-dir`:
Specify a custom template directory. You can then use the [`template`](#template) option to specify a custom template. For more info see how to make [custom templates](#custom-templates).

Example:

```bash
📁 customTemplates
    📁 classComp
        📄 component.js # implementation
        📄 index.js # to export components
        📄 types.js # for types and interfaces
        📄 animations.js # for animations
📁 tests
📁 components
...
```

```bash
gen MyComponent --td customTemplates -t classComp
```

Generates:

```bash
📁 myComponent
    📄 myComponent.jsx # implementation
    📄 index.js # to export components
    📄 types.js # for types and interfaces
    📄 animations.js # for animations
```

### `help`

`-h` or `--help`: Show help.

```bash
gen --help
```
