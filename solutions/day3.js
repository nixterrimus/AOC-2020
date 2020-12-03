const fs = require("fs");

function sampleInput() {
  return `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/day3.txt", "utf8").trim();
}

/*
type Position {
  x: number,
  y: number
}

type Movement {
  right: number,
  down: number
}

type TripStatistics {
  treesEncountered: number
}

type MovementResult {
  stats: TripStatistics,
  finalPosition: Position
}
*/

const TREE = "#";
const BLANK_SPOT = ".";

function move(treeMap, startingPosition, movement) /* MovementResult */ {
  const columnWidth = treeMap[0].length;
  const rowCount = treeMap.length;

  var totalTreesSeen = 0;

  const finalColumn = (startingPosition.x + movement.right) % columnWidth;

  const finalRow = startingPosition.y + movement.down;

  if (finalRow < rowCount && treeMap[finalRow][finalColumn] == TREE) {
    totalTreesSeen += 1;
  }

  return {
    stats: {
      treesEncountered: totalTreesSeen,
    },
    finalPosition: {
      x: finalColumn,
      y: finalRow,
    },
  };
}

function sledMapWithOffset(treeMap, movement) /* MovementResult */ {
  const hillHeight = treeMap.length;

  var currentPosition = { x: 0, y: 0 };
  var treesSeen = 0;

  while (currentPosition.y < hillHeight) {
    const r = move(treeMap, currentPosition, movement);
    treesSeen += r.stats.treesEncountered;
    currentPosition = r.finalPosition;
  }

  return {
    stats: {
      treesEncountered: treesSeen,
      finalPosition: currentPosition,
    },
  };
}

function treesEncounteredOnSled(treeMap, movement) {
  return sledMapWithOffset(treeMap, movement).stats.treesEncountered;
}

function productOfTreesEncountered(treeMap, movements) {
  return movements.reduce((product, movement) => {
    const trees = treesEncounteredOnSled(treeMap, movement);
    return product * trees;
  }, 1);
}

function main() {
  const treeMap = realInput()
    .split("\n")
    .map((line) => {
      return line.split("");
    });

  const result = treesEncounteredOnSled(treeMap, { right: 3, down: 1 });
  console.log(result);

  const result2 = productOfTreesEncountered(treeMap, [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]);

  console.log(result2);
}

main();
