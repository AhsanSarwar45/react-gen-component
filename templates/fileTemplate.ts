// component.tsx
export const component = (componentName: string, isTypescript: boolean) => `
// External imports
import React from 'react';
    
// Component imports
${isTypescript ? `import { ${componentName}Props } from './types';` : ""}

// Project imports


const ${componentName} = (props${
    isTypescript ? `: ${componentName}Props` : ""
}) => {
  return (<></>);
};

${componentName}.defaultProps = {};

export default ${componentName};
`;

// types.ts
export const type = (name: string) => `
export interface ${name}Props {
  
}
`;

// index.ts
export const barrel = (
    componentName: string,
    fileName: string,
    isTypescript: boolean
) => `
import ${componentName} from './${fileName}';

export * from './${fileName}';
${isTypescript ? `export * from "./types";` : ""}

export default ${componentName};

`;
