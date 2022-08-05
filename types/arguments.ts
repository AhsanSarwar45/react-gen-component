import { ParsedArgs } from "minimist";

export interface Arguments extends ParsedArgs {
    typescript?: boolean;
    case?: string;
    "comp-case"?: string;
    directory?: string;
    "template-dir"?: string;
    template?: string;
}
