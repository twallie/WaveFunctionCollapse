class Grid {
    array: string[][];
    dimensions: number;

    constructor(dimensions: number) {
        this.dimensions = dimensions;

        // Populating each position with a number
        // If properly implemented, should result in
        //   1 2 3
        //   4 5 6
        // y 7 8 9
        //   x
        let count = 0;
        this.array = new Array(this.dimensions);
        for (let y = this.dimensions - 1; y >= 0; y--) {
            this.array[y] = new Array(this.dimensions);
            for (let x = 0; x < this.dimensions; x++) {
                this.array[y][x] = String(count++);
            }
        }
    }

    public printGrid() {
        for (let y = this.dimensions - 1; y >= 0; y--) {
            process.stdout.write("\n");
            for (let x = 0; x < this.dimensions; x++) {
                process.stdout.write(this.array[y][x]);
            }
        }
        process.stdout.write("\n");
    }
}

export { Grid };
