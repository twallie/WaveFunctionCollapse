import { Symbol, completeSymbolList } from "./symbol";

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
}

interface TileConfiguration {
    up: boolean | undefined;
    right: boolean | undefined;
    down: boolean | undefined;
    left: boolean | undefined;
}

export { Tile };
export type { TileConfiguration };
