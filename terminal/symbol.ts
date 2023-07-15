interface SymbolConfiguration {
    up: boolean;
    right: boolean;
    down: boolean;
    left: boolean;
}

interface Symbol {
    ascii: string;
    configuration: SymbolConfiguration;
}

// TODO: Write function that given a TileConfiguration, it returns all valid symbols in the completeSymbolList that are compatible

const completeSymbolList: Symbol[] = [
    {
        ascii: "═",
        configuration: {
            up: false,
            right: true,
            down: false,
            left: true,
        },
    },
    {
        ascii: "║",
        configuration: {
            up: true,
            right: false,
            down: true,
            left: false,
        },
    },
    {
        ascii: "╔",
        configuration: {
            up: false,
            right: true,
            down: true,
            left: false,
        },
    },

    {
        ascii: "╗",
        configuration: {
            up: false,
            right: false,
            down: true,
            left: true,
        },
    },

    {
        ascii: "╚",
        configuration: {
            up: true,
            right: true,
            down: false,
            left: false,
        },
    },

    {
        ascii: "╝",
        configuration: {
            up: true,
            right: false,
            down: false,
            left: true,
        },
    },

    {
        ascii: "╠",
        configuration: {
            up: true,
            right: true,
            down: true,
            left: false,
        },
    },

    {
        ascii: "╣",
        configuration: {
            up: true,
            right: false,
            down: true,
            left: true,
        },
    },

    {
        ascii: "╬",
        configuration: {
            up: true,
            right: true,
            down: true,
            left: true,
        },
    },

    {
        ascii: "╦",
        configuration: {
            up: false,
            right: true,
            down: true,
            left: true,
        },
    },
];

export { completeSymbolList };
export { Symbol };
