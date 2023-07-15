import { MinHeap } from "../min_heap";

let testCase: number[] = [];
for (let i = 0; i < 100000; i++) {
    testCase.push(Math.floor(Math.random() * (100000 + 1)));
}

const minHeap = new MinHeap();
testCase.forEach((number) => {
    minHeap.insert({
        entropy: number,
        coordinate: {
            x: 0,
            y: 0,
        },
    });
});

let lastSeen = minHeap.extractMin();
if (lastSeen != null) {
    while (minHeap.array.length != 0) {
        console.log(lastSeen);
        if (minHeap.getMin().entropy < lastSeen.entropy) {
            console.log("FAIL!");
            break;
        }
        lastSeen = minHeap.extractMin();
        if (lastSeen == undefined) {
            break;
        }
    }
}

console.log("YIPPEE!");
