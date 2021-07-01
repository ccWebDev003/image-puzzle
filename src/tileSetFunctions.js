
import shuffle from 'shuffle-array';

export function generateTileSet() {
    let newTilesArray = [];
    for (let i = 0; i < 16; i++) {
        let newTile = {
            id: i,
            top: -(Math.floor(i / 4)) * 100,
            left: i < 4 ? -i * 100 : -(i % 4) * 100,
            pos: i
        };
        newTilesArray.push(newTile);
    }
    return newTilesArray;
}

export function reverseTileSet(tiles) {
    const newTiles = tiles.reverse();
    for (let i = 0; i < 16; i++) {
        let tile = newTiles[i];
        tile.pos = i;
    }
    return newTiles;
}

export function shuffleTileSet(tiles) {
    const newTiles = shuffle(tiles);
    for (let i = 0; i < 16; i++) {
        let tile = newTiles[i];
        tile.pos = i;
    }
    return newTiles;
}

export function swapTilesInSet(tiles, id1, id2) {
    let source = Object.assign({}, tiles.find(t => t.id === id1));
    let dest = Object.assign({}, tiles.find(t => t.id === id2));
    let sourcePos = source.pos;
    source.pos = dest.pos;
    source.selected = false;
    tiles[source.pos] = source;
    dest.pos = sourcePos;
    tiles[dest.pos] = dest;
    return tiles;
}

export function allTilesAreAligned(tiles) {
    return (tiles.findIndex(t => t.id !== t.pos) === -1);
}
