# react-gen-component

Generate react component scaffolds.

```bash
npm i -g react-gen-component
```

## Table of Contents

1. [How to use](#how-to-use)
1. [Typescript](#typescript)
1. [Arguments](#Arguments)

## How to use

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

```bash
gen-component MyComponent --ts
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

## Arguments

-   `--ts` or `--typescript`: Generate typescript files.

    ```bash
    gen-component MyComponent --ts
    ```

-   `--case`: Specify file name case.

    -   `camel` (camelCase) `default`
    -   `kebab` (kebab-case)
    -   `pascal` (PascalCase)

    Example:

    ```bash
    gen-component MyComponent --case kebab
    ```

    Generates:

    ```bash
    📁 my-component
        📄 my-component.jsx # implementation
        📄 index.js # to export components
    ```
