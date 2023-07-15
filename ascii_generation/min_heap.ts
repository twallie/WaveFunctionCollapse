import { EntropyCoordinatePair } from "./types";

export class MinHeap {
    array: EntropyCoordinatePair[];

    constructor() {
        this.array = [];
    }

    static leftChildOf(index: number) {
        return 2 * index + 1;
    }

    static rightChildOf(index: number) {
        return 2 * index + 2;
    }

    static parentOf(index: number) {
        return Math.floor((index - 1) / 2);
    }

    getMin() {
        return this.array[0];
    }

    minHeapify(index: number) {
        const n = this.array.length;
        if (n == 1) {
            return;
        }
        const left = MinHeap.leftChildOf(index);
        const right = MinHeap.rightChildOf(index);
        let smallest = index;
        if (left < n && this.array[left].entropy < this.array[index].entropy) {
            smallest = left;
        }
        if (
            right < n &&
            this.array[right].entropy < this.array[smallest].entropy
        ) {
            smallest = right;
        }
        if (smallest != index) {
            [this.array[index], this.array[smallest]] = [
                this.array[smallest],
                this.array[index],
            ];
            this.minHeapify(smallest);
        }
    }

    insert(value: EntropyCoordinatePair) {
        this.array.push(value);

        let i = this.array.length - 1;
        while (
            i > 0 &&
            this.array[MinHeap.parentOf(i)].entropy > this.array[i].entropy
        ) {
            let p = MinHeap.parentOf(i);
            [this.array[i], this.array[p]] = [this.array[p], this.array[i]];
            i = p;
        }
    }

    extractMin() {
        if (this.array.length == 1) {
            return this.array.pop();
        }

        let res = this.array[0];
        this.array[0] = this.array[this.array.length - 1];
        this.array.pop();
        this.minHeapify(0);
        return res;
    }
}
