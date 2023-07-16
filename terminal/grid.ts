import { Tile } from "./tile";

class Grid {
    array: Tile[][];

    uncollapsed: number;

    height: number;
    length: number;

    constructor(height: number, length: number) {
        this.height = height;
        this.length = length;
        this.uncollapsed = this.height * this.length;

        this.array = new Array(height);
        for (let y = height - 1; y >= 0; y--) {
            this.array[y] = new Array(length);
            for (let x = 0; x < length; x++) {
                this.array[y][x] = new Tile(x, y);
            }
        }
    }

    public run() {
        const start = performance.now();

        while (this.uncollapsed != 0) {
            // Collapse random tile w/ lowest entropy
            const options = this.findSmallestEntropyTiles();
            const choice = options[Math.floor(Math.random() * options.length)];
            choice.collapse();
            this.uncollapsed--;

            // Propagate info from collapsed tile
            this.propagate(choice);

            // Print
            this.printGrid();
            console.clear();
        }

        const end = performance.now();
        const elapsed = end - start;

        const result = (Math.round((elapsed / 1000) * 100) / 100).toFixed(2);

        this.printGridWithText([` - Took ${result} seconds to execute.`]);
    }

    private propagate(tile: Tile) {
        if (
            tile.configuration.up == undefined ||
            tile.configuration.right == undefined ||
            tile.configuration.down == undefined ||
            tile.configuration.left == undefined
        ) {
            return;
        }

        // Up
        if (this.withinBounds(tile.x, tile.y + 1)) {
            this.array[tile.y + 1][tile.x].setDown(tile.configuration.up);
        }

        // Right
        if (this.withinBounds(tile.x + 1, tile.y)) {
            this.array[tile.y][tile.x + 1].setLeft(tile.configuration.right);
        }

        // Down
        if (this.withinBounds(tile.x, tile.y - 1)) {
            this.array[tile.y - 1][tile.x].setUp(tile.configuration.down);
        }

        // Left
        if (this.withinBounds(tile.x - 1, tile.y)) {
            this.array[tile.y][tile.x - 1].setRight(tile.configuration.left);
        }
    }

    private withinBounds(x: number, y: number) {
        if (x >= this.length || x < 0) {
            return false;
        }
        if (y >= this.height || y < 0) {
            return false;
        }
        return true;
    }

    private findSmallestEntropyTiles(): Tile[] {
        let smallestEntropy = Infinity;
        let result: Tile[] = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.length; x++) {
                const tile = this.array[y][x];
                if (tile.collapsed) {
                    continue;
                }
                if (smallestEntropy > tile.entropy) {
                    result = [];
                    smallestEntropy = tile.entropy;
                }
                if (smallestEntropy >= tile.entropy) {
                    result.push(tile);
                }
            }
        }
        return result;
    }

    private printGridWithText(textArray: string[]) {
        let messageIndex = 0;
        for (let y = this.height - 1; y >= 0; y--) {
            process.stdout.write("\n");
            for (let x = 0; x < this.length; x++) {
                process.stdout.write(String(this.array[y][x].shown));
            }
            if (messageIndex < textArray.length) {
                process.stdout.write(textArray[messageIndex++]);
            }
        }
        process.stdout.write("\n");
    }

    public printGrid() {
        for (let y = this.height - 1; y >= 0; y--) {
            process.stdout.write("\n");
            for (let x = 0; x < this.length; x++) {
                process.stdout.write(String(this.array[y][x].shown));
            }
        }
        process.stdout.write("\n");
    }
}

export { Grid };
