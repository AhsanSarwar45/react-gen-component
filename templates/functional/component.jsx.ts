export default (
    componentName: string,
    componentFileName: string,
    isTypescript: boolean
) => `// External imports
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
