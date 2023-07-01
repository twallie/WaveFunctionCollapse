// configuration is in the form of [up, down, right, left]

interface SymbolData {
    symbol: string;
    configuration: {
        up: boolean;
        right: boolean;
        down: boolean;
        left: boolean;
    };
}
export const symbols: SymbolData[] = [
    {
        symbol: "═",
        configuration: {
            up: false,
            right: true,
            down: false,
            left: true,
        },
    },

    {
        symbol: "║",
        configuration: {
            up: true,
            right: false,
            down: true,
            left: false,
        },
    },

    {
        symbol: "╔",
        configuration: {
            up: false,
            right: true,
            down: true,
            left: false,
        },
    },

    {
        symbol: "╗",
        configuration: {
            up: false,
            right: false,
            down: true,
            left: true,
        },
    },

    {
        symbol: "╚",
        configuration: {
            up: true,
            right: true,
            down: false,
            left: false,
        },
    },

    {
        symbol: "╝",
        configuration: {
            up: true,
            right: false,
            down: false,
            left: true,
        },
    },

    {
        symbol: "╠",
        configuration: {
            up: true,
            right: true,
            down: true,
            left: false,
        },
    },

    {
        symbol: "╣",
        configuration: {
            up: true,
            right: false,
            down: true,
            left: true,
        },
    },

    {
        symbol: "╬",
        configuration: {
            up: true,
            right: true,
            down: true,
            left: true,
        },
    },

    {
        symbol: "╦",
        configuration: {
            up: false,
            right: true,
            down: true,
            left: true,
        },
    },
];

/**
 * All the data important to fitting a piece in
 */
interface Configuration {
    up?: boolean;
    right?: boolean;
    down?: boolean;
    left?: boolean;
}

/**
 * A default tile
 */
export class Tile {
    entropy: number; // A value between 0-10
    configuration: Configuration; // Tells us what pieces could go here
    possibilities: SymbolData[];
    collapsed: boolean;
    shown: string;

    constructor() {
        this.entropy = 10;
        this.configuration = {
            up: undefined,
            right: undefined,
            down: undefined,
            left: undefined,
        };
        this.collapsed = false;
        this.possibilities = [];
        this.shown = "x";
        this.updateEntropy();
    }

    updateConfiguration(
        up?: boolean,
        right?: boolean,
        down?: boolean,
        left?: boolean
    ) {
        if (
            typeof up == undefined &&
            typeof down == undefined &&
            typeof right == undefined &&
            typeof left == undefined
        ) {
            // We need to updating atleast ONE part of the configuration
            return;
        }

        // Update up
        if (up != undefined) {
            this.configuration.up = up;
        }

        // Update down
        if (down != undefined) {
            this.configuration.down = down;
        }

        // Update right
        if (right != undefined) {
            this.configuration.right = right;
        }

        // Update left
        if (left != undefined) {
            this.configuration.left = left;
        }

        // Update entropy
        this.updateEntropy();
    }

    updateEntropy() {
        if (this.collapsed) {
            this.entropy = 0;
            return;
        }

        let newPossibilities: SymbolData[] = [];

        symbols.forEach((can) => {
            // can == candidate
            // Test to see if this is a possible piece
            if (
                compatible(can.configuration.up, this.configuration.up) &&
                compatible(can.configuration.right, this.configuration.right) &&
                compatible(can.configuration.down, this.configuration.down) &&
                compatible(can.configuration.left, this.configuration.left)
            ) {
                newPossibilities.push(can);
            }
        });

        this.possibilities = newPossibilities;
        this.entropy = this.possibilities.length;

        function compatible(desired: boolean, current?: boolean) {
            return current == undefined || current == desired;
        }
    }

    collapse() {
        const length = this.possibilities.length;
        const randomIndex = Math.floor(Math.random() * length);
        const choice = this.possibilities[randomIndex];

        console.log(
            "COLLAPING PIECE!",
            this.configuration,
            this.possibilities,
            choice.symbol
        );
        console.log("");

        this.collapsed = true;
        this.shown = choice.symbol;
        this.configuration = choice.configuration;
    }
}

// const test: Tile = new Tile();
// console.log(test.configuration, test.entropy, test.possibilities);
// test.updateConfiguration(false, undefined, undefined, undefined); // top piece we cannot connect to
// console.log(test.configuration, test.entropy, test.possibilities);
// test.updateConfiguration(undefined, undefined, undefined, true);
// console.log(test.configuration, test.entropy, test.possibilities);
// test.updateConfiguration(undefined, true, undefined, undefined);
// console.log(test.configuration, test.entropy, test.possibilities);
// test.updateConfiguration(undefined, undefined, true, undefined);
// console.log(test.configuration, test.entropy, test.possibilities);
