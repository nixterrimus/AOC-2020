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
  

  for (var rightOffset = 1; rightOffset <= movement.right; rightOffset++){
    const row = startingPosition.x;
    const column = (startingPosition.y + rightOffset) % columnWidth;
  
    if (treeMap[row][column] == TREE){
      totalTreesSeen += 1
    }
  }
  
  const finalColumn = (startingPosition.y + movement.right) % columnWidth;
  
  for (var downOffset = 1; downOffset <= movement.down; downOffset++){
    const column = finalColumn;
    const row = startingPosition.y + downOffset;
    
    if (row < rowCount && treeMap[row][column] == TREE){
      totalTreesSeen += 1
    }
    console.log("move Down")
  }
  
  const finalRow = startingPosition.y + movement.down;
  
  return {
    stats: {
      treesEncountered: totalTreesSeen,
    },
    finalPosition: {
      x: finalColumn,
      y: finalRow
    }
  }
}

function walkMapWithOffset(treeMap, movement) /* MovementResult */ {
  const hillHeight = treeMap.length;
  
  var currentPosition = {x: 0, y: 0};
  var treesSeen = 0;
  
  while(currentPosition.y < hillHeight){
      const r = move(treeMap, currentPosition, movement)
      treesSeen += r.stats.treesEncountered;
      currentPosition = r.finalPosition;
      console.log(r)
  }
  
  return {
    stats: {
      treesEncountered: treesSeen,
      finalPosition: currentPosition
    }
  }

}

function main() {
  //  const input = fs.readFileSync("./inputs/dayX.txt", "utf8");
  const treeMap = sampleInput()
    .split("\n")
    .map(line => {
      return line.split("")
    })
    
  const a = walkMapWithOffset(treeMap, {right: 3, down: 1})
  console.log(a);
}

main();
