export default (
    componentName: string,
    fileName: string,
    isTypescript: boolean
) => `import ${componentName} from './${fileName}';

export * from './${fileName}';
${isTypescript ? `export * from "./types";` : ""}

export default ${componentName};
`;
