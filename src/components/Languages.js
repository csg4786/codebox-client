export const languagesMap = new Map ([
    ["", {
        name: "Select Language",
        format: "",
        snippet: "",
    }],
    ["c", {
        name: "C",
        format: "c",
        snippet: "#include<stdio.h>\nint main() {\n\tprintf(\"Hello C!\");\n\treturn 0;\n}",
    }],
    ["cpp", {
        name: "C++",
        format: "cpp",
        snippet: "#include<iostream>\nusing namespace std;\nint main() {\n\tcout << \"Hello C++!\";\n\treturn 0;\n}",
    }],
    ["js", {
        name: "JavaScript",
        format: "js",
        snippet: "console.log(\"Hello JavaScript!\")",
    }],
    ["py", {
        name: "Python",
        format: "py",
        snippet: "print(\"Hello Python!\")",
    }],
]);

export const languagesList = [
    {
        name: "Select Language",
        format: "",
        snippet: "",
    },
    {
        name: "C",
        format: "c",
        snippet: "#include<stdio.h>\nint main() {\n\tprintf(\"Hello C!\");\n\treturn 0;\n}",
    },
    {
        name: "C++",
        format: "cpp",
        snippet: "#include<iostream>\nusing namespace std;\nint main() {\n\tcout << \"Hello C++!\";\n\treturn 0;\n}",
    },
    {
        name: "JavaScript",
        format: "js",
        snippet: "console.log(\"Hello JavaScript!\")",
    },
    {
        name: "Python",
        format: "py",
        snippet: "print(\"Hello Python!\")",
    },
];
