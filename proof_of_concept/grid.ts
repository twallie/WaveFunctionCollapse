import { Tile } from "./tiles";
// y
// 2 x x x
// 1 x x x
// 0 x x x
//   0 1 2 x

interface Coordinate {
    x: number;
    y: number;
}

class Grid {
    dimensions: number;
    grid: Tile[][];
    uncollapsed: number;

    constructor(dimensions: number) {
        // Initalizations
        this.grid = [];
        this.dimensions = dimensions;
        this.uncollapsed = this.dimensions * this.dimensions;

        // Building the grid
        for (let y = 0; y < this.dimensions; y++) {
            this.grid.push([]);
            for (let x = 0; x < this.dimensions; x++) {
                this.grid[y][x] = new Tile();
            }
        }
    }

    async run() {
        while (this.uncollapsed != 0) {
            // Collapse a random tile w/ the lowest entropy
            const lowestEntropyList = this.getLowestEntropyList();
            const randomIndex = Math.floor(
                Math.random() * lowestEntropyList.length
            );
            const lowestEntropyCoordinate = lowestEntropyList[randomIndex];
            const lowestEntropyTile =
                this.grid[lowestEntropyCoordinate.y][lowestEntropyCoordinate.x];
            lowestEntropyTile.collapse();
            this.uncollapsed--;

            // Propagate to neighbors to change their entropy
            this.propagate(lowestEntropyCoordinate);

            console.clear();
            await this.printGrid();
        }
    }

    propagate(coord: Coordinate) {
        // Propagate up if possible
        if (this.withinBounds(coord.x, coord.y + 1)) {
            this.grid[coord.y + 1][coord.x].updateConfiguration(
                undefined,
                undefined,
                this.grid[coord.y][coord.x].configuration.up,
                undefined
            );
        }

        // Propagate right if possible
        if (this.withinBounds(coord.x + 1, coord.y)) {
            this.grid[coord.y][coord.x + 1].updateConfiguration(
                undefined,
                undefined,
                undefined,
                this.grid[coord.y][coord.x].configuration.right
            );
        }

        // Propagate down if possible
        if (this.withinBounds(coord.x, coord.y - 1)) {
            this.grid[coord.y - 1][coord.x].updateConfiguration(
                this.grid[coord.y][coord.x].configuration.down,
                undefined,
                undefined,
                undefined
            );
        }

        // Propagate left if possible
        if (this.withinBounds(coord.x - 1, coord.y)) {
            this.grid[coord.y][coord.x - 1].updateConfiguration(
                undefined,
                this.grid[coord.y][coord.x].configuration.left,
                undefined,
                undefined
            );
        }
    }

    withinBounds(x: number, y: number) {
        if (x < 0 || y < 0) {
            return false;
        } else if (x >= this.dimensions || y >= this.dimensions) {
            return false;
        } else {
            return true;
        }
    }

    getLowestEntropyList(): Coordinate[] {
        let lowestEntropy = Infinity;
        let lowestEntropyList: Coordinate[] = [];

        // Traversing to find lowest entropy tiles
        for (let y = 0; y < this.dimensions; y++) {
            for (let x = 0; x < this.dimensions; x++) {
                if (this.grid[y][x].collapsed) {
                    continue;
                } else if (lowestEntropy > this.grid[y][x].entropy) {
                    lowestEntropy = this.grid[y][x].entropy;
                    lowestEntropyList = [{ x: x, y: y }];
                } else if (lowestEntropy == this.grid[y][x].entropy) {
                    lowestEntropyList.push({ x: x, y: y });
                }
            }
        }

        return lowestEntropyList;
    }

    async printGrid() {
        for (let y = this.dimensions - 1; y >= 0; y--) {
            for (let x = 0; x < this.dimensions; x++) {
                process.stdout.write(this.grid[y][x].shown);
            }
            process.stdout.write("\n");
        }
        process.stdout.write("\n");
    }
}

async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const grid = new Grid(30);
grid.run();
