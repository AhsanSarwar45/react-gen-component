import { ParsedArgs } from "minimist";

export interface Arguments extends ParsedArgs {
    ts?: boolean;
    typescript?: boolean;

    c?: string;
    case?: string;

    cc?: string;
    "comp-case"?: string;

    d?: string;
    dir?: string;
    directory?: string;

    td?: string;
    "template-dir"?: string;

    t?: string;
    template?: string;
}
