export default (
    componentName: string,
    componentFileName: string,
    isTypescript: boolean
) => `// External imports
import React from 'react';
    
// Component imports
${isTypescript ? `import { ${componentName}Props } from './types';` : ""}

// Project imports


class ${componentName} extends React.Component${
    isTypescript ? `<${componentName}Props>` : ""
}{
  static defaultProps = {
     
  };

  render() {
    return (<></>);
  }
};

export default ${componentName};
`;
