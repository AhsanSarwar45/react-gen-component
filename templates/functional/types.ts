export default (
    componentName: string,
    componentFileName: string,
    isTypescript: boolean
) =>
    isTypescript
        ? `export interface ${componentName}Props {
  
}
`
        : null;
