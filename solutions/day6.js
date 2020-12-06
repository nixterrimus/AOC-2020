const fs = require("fs");

function sampleInput() {
  return `
  abc

a
b
c

ab
ac

a
a
a
a

b
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/day6.txt", "utf8").trim();
}

function unique(items) {
  return [...new Set(items)];
}

function itemCount(total, items) {
  return total + items.length;
}

function setIntersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function yesesForGroup(group) {
  const allItems = group
    .split("\n")
    .map((g) => g.split(""))
    .map((g) => new Set(g));

  const intersection = allItems.reduce(setIntersection, allItems[0]);

  return [...intersection];
}

function main() {
  const answers = realInput().split("\n\n");

  const part1 = answers
    .map((g) => g.replace(/\n/g, ""))
    .map((g) => g.split(""))
    .map(unique)
    .reduce(itemCount, 0);

  const part2 = answers.flatMap(yesesForGroup).reduce(itemCount, 0);

  console.log(part1);
  console.log(part2);
}

main();
