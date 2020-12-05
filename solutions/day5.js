const fs = require("fs");

function sampleInput() {
  return `
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/day5.txt", "utf8").trim();
}

function binarySpacePartition(lowerChar, upperChar) {
  return (currentRange, input) => {
    const sizeOfSplit = (currentRange.upper - currentRange.lower + 1) / 2;
    if (input == lowerChar) {
      return {
        lower: currentRange.lower,
        upper: currentRange.upper - sizeOfSplit,
      };
    } else if (input == upperChar) {
      return {
        lower: currentRange.lower + sizeOfSplit,
        upper: currentRange.upper,
      };
    }
    return currentRange;
  };
}

function parseRow(input) {
  const result = input
    .split("")
    .reduce(binarySpacePartition("F", "B"), { lower: 0, upper: 127 });

  if (result.lower != result.upper) {
    console.log("ERRROR");
  }

  return result.lower;
}

function parseFullSeatCode(input) {
  return {
    row: parseRow(input.slice(0, 7)),
    column: parseColumn(input.slice(7, 10)),
  };
}

function calculateSeatId(ticket) {
  return ticket.row * 8 + ticket.column;
}

function parseColumn(input) {
  const result = input
    .split("")
    .reduce(binarySpacePartition("L", "R"), { lower: 0, upper: 7 });
  if (result.lower != result.upper) {
    console.log("ERRROR");
  }

  return result.lower;
}

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

function findMissingSeat(seats) {
  const offset = seats[0];
  for (i = 0; i < seats.length; i++) {
    const expectedSeat = i + offset;
    if (seats[i] != expectedSeat) {
      return expectedSeat;
    }
  }

  return -1;
}

function main() {
  const result = realInput()
    .split("\n")
    .map(parseFullSeatCode)
    .map(calculateSeatId)
    .max();

  const sortedSeats = realInput()
    .split("\n")
    .map(parseFullSeatCode)
    .map(calculateSeatId)
    .sort((a, b) => a - b);
  const result2 = findMissingSeat(sortedSeats);

  //  console.log(result)
  console.log(result2);
}

main();
