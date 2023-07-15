import { TileConfiguration } from "./tile";

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

function pruneSymbolArray(array: Symbol[], tile: TileConfiguration): Symbol[] {
    const newArray: Symbol[] = [];
    for (let i = 0; i < array.length; i++) {
        if (!compatible(tile, array[i].configuration)) {
            continue;
        }
        newArray.push(array[i]);
    }
    return newArray;

    function compatible(tile: TileConfiguration, symbol: SymbolConfiguration) {
        const tileSides = [tile.up, tile.right, tile.down, tile.left];
        const symbolSides = [symbol.up, symbol.right, symbol.down, symbol.left];
        for (let i = 0; i < 4; i++) {
            if (tileSides[i] != undefined) {
                if (tileSides[i] != symbolSides[i]) {
                    return false;
                }
            }
        }
        return true;
    }
}

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
    {
        ascii: "╩",
        configuration: {
            up: true,
            right: true,
            down: false,
            left: true,
        },
    },
];

export { completeSymbolList };
export { pruneSymbolArray };
export type { Symbol };
