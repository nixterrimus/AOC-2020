var fs = require("fs");

function findTwoValuesThatSum(values, targetValue) {
  for (const a of values) {
    for (const b of values) {
      if (a + b == targetValue) {
        return [a, b];
      }
    }
  }
  return null;
}

function findThreeValuesThatSum(values, targetValue) {
  for (const a of values) {
    for (const b of values) {
      for (const c of values) {
        if (a + b + c == targetValue) {
          return [a, b, c];
        }
      }
    }
  }
  return null;
}

function multiply(a, b) {
  return a * b;
}

function findProduct(inputs, target, factorFunction) {
  const factors = factorFunction(inputs, target);
  if (factors == null) {
    return null;
  }
  return factors.reduce(multiply);
}

function main() {
  const input = fs
    .readFileSync("./inputs/day1.txt", "utf8")
    .split("\n")
    .map((x) => parseInt(x));

  console.log(findProduct(input, 2020, findTwoValuesThatSum));
  console.log(findProduct(input, 2020, findThreeValuesThatSum));
}
main();
