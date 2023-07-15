import { Tile } from "./tile";

class Grid {
    array: Tile[][];
    dimensions: number;

    constructor(dimensions: number) {
        this.dimensions = dimensions;

        let count = 0;
        this.array = new Array(this.dimensions);
        for (let y = this.dimensions - 1; y >= 0; y--) {
            this.array[y] = new Array(this.dimensions);
            for (let x = 0; x < this.dimensions; x++) {
                this.array[y][x] = new Tile();
            }
        }
    }

    public printGrid() {
        for (let y = this.dimensions - 1; y >= 0; y--) {
            process.stdout.write("\n");
            for (let x = 0; x < this.dimensions; x++) {
                process.stdout.write(String(this.array[y][x].shown));
            }
        }
        process.stdout.write("\n");
    }
}

export { Grid };
