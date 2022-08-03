export const toCamelCase = (str: string) => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, offset) =>
            offset === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, "");
};

export const toKebabCase = (str: string) => {
    return str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        (word, offset) => (offset === 0 ? "" : "-") + word.toLowerCase()
    );
};

export const toPascalCase = (str: string) => {
    return `${str}`
        .replace(new RegExp(/[-_]+/, "g"), " ")
        .replace(new RegExp(/[^\w\s]/, "g"), "")
        .replace(
            new RegExp(/\s+(.)(\w*)/, "g"),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
