import { Tile } from "./tiles";
// y
// 2 x x x
// 1 x x x
// 0 x x x
//   0 1 2 x

class Grid {
    dimensions: number;
    grid: Tile[][];

    constructor(dimensions: number) {
        // Initalizations
        this.grid = [];

        // Saving dimensions
        this.dimensions = dimensions;

        // Building the grid
        for (let y = 0; y < this.dimensions; y++) {
            this.grid.push([]);
            for (let x = 0; x < this.dimensions; x++) {
                this.grid[y][x] = new Tile();
            }
        }

        this.printGrid();
    }

    printGrid() {
        for (let y = this.dimensions - 1; y >= 0; y--) {
            for (let x = 0; x < this.dimensions; x++) {
                process.stdout.write(this.grid[y][x].shown);
            }
            process.stdout.write("\n");
        }
    }
}

const grid = new Grid(3);
