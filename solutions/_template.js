const fs = require("fs");

function sampleInput() {
  return `
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/dayX.txt", "utf8").trim();
}

function main() {
  const input = sampleInput;
}

main();
