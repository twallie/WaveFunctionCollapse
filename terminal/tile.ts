import { Symbol, completeSymbolList, pruneSymbolArray } from "./symbol";

class Tile {
    configuration: TileConfiguration;

    shown: string | undefined;

    possibilities: Symbol[];
    entropy: number;
    collapsed: boolean;

    constructor() {
        this.configuration = {
            up: undefined,
            right: undefined,
            down: undefined,
            left: undefined,
        };

        this.shown = undefined;

        this.possibilities = completeSymbolList;
        this.entropy = this.possibilities.length;
        this.collapsed = false;
    }

    setUp(value: boolean) {
        this.configuration.up = value;
        this.refresh();
    }
    setRight(value: boolean) {
        this.configuration.right = value;
        this.refresh();
    }
    setDown(value: boolean) {
        this.configuration.down = value;
        this.refresh();
    }
    setLeft(value: boolean) {
        this.configuration.left = value;
        this.refresh();
    }

    collapse() {
        // Choose random element
        let choiceIndex = Math.floor(Math.random() * this.possibilities.length);
        let choice = this.possibilities[choiceIndex];

        // Update metadata
        this.possibilities = [choice];
        this.configuration = choice.configuration;
        this.entropy = 1;
        this.collapsed = true;
        this.shown = choice.ascii;
    }

    private refresh() {
        this.possibilities = pruneSymbolArray(
            this.possibilities,
            this.configuration
        );
        this.entropy = this.possibilities.length;
    }
}

interface TileConfiguration {
    up: boolean | undefined;
    right: boolean | undefined;
    down: boolean | undefined;
    left: boolean | undefined;
}

export { Tile };
export type { TileConfiguration };
