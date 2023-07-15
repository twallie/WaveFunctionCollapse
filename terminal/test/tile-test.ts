import { Tile } from "../tile";

const tile = new Tile(0, 0);
console.log(tile, tile.configuration);
tile.setUp(true);

console.log(tile, tile.configuration);
tile.setDown(true);

console.log(tile, tile.configuration);
tile.setRight(false);

console.log(tile, tile.configuration);
tile.setLeft(false);

console.log(tile, tile.configuration);
tile.collapse();

console.log(tile, tile.configuration);
