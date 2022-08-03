// component.tsx
export const component = (componentName, isTypescript) => `
// External imports
import React from 'react';
    
// Component imports
${isTypescript ? `import { ${componentName}Props } from './types';` : ''}

// Project imports


const ${componentName} = (props${isTypescript ? `: ${componentName}Props`: ''}) => {
  return (<></>);
};

${componentName}.defaultProps = {};

export default ${componentName};
`;

// types.ts
export const type = (name) => `
export interface ${name}Props {
  
}
`;

// index.ts
export const barrel = (componentName, fileName, isTypescript) => `
import ${componentName} from './${fileName}';

export * from './${fileName}';
${isTypescript ? `export * from "./types";` : ''}

export default ${componentName};

`;
