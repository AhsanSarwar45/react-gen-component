const fs = require("fs");

export const getFileNames = (dir: string): string[] => {
    return fs
        .readdirSync(dir)
        .map((name: String) => name.replace(/\.[^/.]+$/, ""));
};
