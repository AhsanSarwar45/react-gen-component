type caseModifier = (str: string) => string;

export interface Cases {
    [key: string]: caseModifier;
}
