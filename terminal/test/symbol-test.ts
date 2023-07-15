import { completeSymbolList, pruneSymbolArray } from "../symbol";
import { TileConfiguration } from "../tile";

const testArray = completeSymbolList;
const testConfiguration: TileConfiguration = {
    up: false,
    right: true,
    down: undefined,
    left: true,
};
const result = pruneSymbolArray(testArray, testConfiguration);
console.log(result);
