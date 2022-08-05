import chalk from "chalk";

const displayHelp = () => {
    console.log(
        "Usage:",
        chalk.bold("gen"),
        chalk.bold.blue("<name>"),
        chalk.bold.green("[options]")
    );
    console.log("\nArguments: ");
    console.log(chalk.blue("  name"), "\tThe name of the component");
    console.log("\nOptions: ");
    console.log(
        chalk.blue("  -c, --case"),
        chalk.green("\t\t\t[camel|kebab|pascal]"),
        "\tThe case of the file names [default: camel]"
    );
    console.log(
        chalk.blue("  -cc, --comp-case"),
        chalk.green("\t\t[camel|kebab|pascal]"),
        "\tThe case of the component file name [default: --case]"
    );
    console.log(
        chalk.blue("  -d, --dir, --directory"),
        chalk.green("\t<string>"),
        "\t\tPath to the directory where the component will be created"
    );
    console.log(
        chalk.blue("  --ts, --typescript"),
        chalk.green("\t\t<flag>"),
        "\t\t\tGenerate typescript files"
    );
    console.log(
        chalk.blue("  -t, --template"),
        chalk.green("\t\t<string>"),
        "\t\tThe template to create from"
    );
    console.log(
        chalk.blue("  -td, --template-dir"),
        chalk.green("\t\t<string>"),
        "\t\tPath to a custom template directory"
    );
    console.log(
        chalk.blue("   -h, --help"),
        chalk.green("\t\t\t<flag>"),
        "\t\t\tDisplay help"
    );
    console.log(
        "\n See",
        chalk.green(
            "https://github.com/AhsanSarwar45/react-gen-component#readme"
        ),
        "for further help"
    );
};

export default displayHelp;
