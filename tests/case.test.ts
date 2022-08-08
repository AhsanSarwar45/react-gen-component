import { toCamelCase, toKebabCase, toPascalCase } from "../utility/case";

const words = [
    "hello world",
    "Hello world",
    "hello_world",
    "hello-world",
    "helloWorld",
    "HelloWorld",
    "Hello World",
];

it("should change given words to camelCase", () => {
    const camelCaseName = "helloWorld";

    for (const word of words) {
        expect(toCamelCase(word)).toBe(camelCaseName);
    }
});
it("should change given words to kebab-case", () => {
    const kebabCaseName = "hello-world";

    for (const word of words) {
        expect(toKebabCase(word)).toBe(kebabCaseName);
    }
});
it("should change given words to PascalCase", () => {
    const PascalCaseName = "HelloWorld";

    for (const word of words) {
        expect(toPascalCase(word)).toBe(PascalCaseName);
    }
});
