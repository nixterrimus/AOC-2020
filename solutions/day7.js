// This went real bad

const fs = require("fs");

function sampleInput() {
  return `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/day7.txt", "utf8").trim();
}

// Parsing
function parseBag(input) {
  const b = input.split(" bags contain ");
  const bagType = b[0];
  const containingBags = b[1]
    .replace(".", "")
    .split(",")
    .map(parseBagDetails)
    .filter((a) => a !== null);

  return {
    name: bagType,
    contains: containingBags,
  };
}

function parseBagDetails(bagDetails) {
  if (bagDetails.startsWith("no other")) {
    return null;
  }
  return {
    quantity: parseInt(bagDetails.trim().match(/(\d)*/)[0]),
    name: bagDetails
      .split(/\d /)[1]
      .replace(/bag[s]*/g, "")
      .trim(),
  };
}

// Construct a bag map from a given input
function buildBagMap(input){
  const result = input.split("\n").map(parseBag);

  const bagMap = result.reduce((bagMap, bagItem) => {
    return _addItemToMap(bagMap, bagItem);
  }, {});
  
  return bagMap
}

function _addSubItemToMap(map, item, containedByColor) {
  if (!map[item.name]) {
    map[item.name] = {
      name: item.name,
      contains: item.contains || [],
      containedBy: [],
    };
  }

  map[item.name].containedBy.push(containedByColor);

  return map;
}

function _addItemToMap(map, item) {
  if (!map[item.name]) {
    map[item.name] = {
      ...item,
      containedBy: [],
    };
  } else {
    map[item.name].contains = item.contains;
  }

  item.contains.forEach((subItem) => {
    _addSubItemToMap(map, subItem, item.name);
  });

  return map;
}

// Solution
function colorsThatCanContainColor(map, color) {
  const colors = map[color].containedBy.reduce((totalColors, targetColor) => {
    return totalColors.concat(colorsThatCanContainColor(map, targetColor));
  }, map[color].containedBy);

  return colors;
}

function uniqueColorCountThatContainColor(map, color){
  const colors = colorsThatCanContainColor(map, color);
    const uniqueColors = [...new Set(colors)];
    return uniqueColors.length;
}

function numberOfBagsContainedBy(map, color) {
  return map[color].contains.reduce((total, containedColor) => {
    return total + containedColor.quantity +
      containedColor.quantity *
        numberOfBagsContainedBy(map, containedColor.name);
  }, 0);
}


function main() {
 const bagMap = buildBagMap(realInput())

  const containingShinyGold = uniqueColorCountThatContainColor(bagMap, "shiny gold");
  console.log(containingShinyGold)

  const shinyGoldBagsContain = numberOfBagsContainedBy(bagMap, "shiny gold");
  console.log(shinyGoldBagsContain);
}

main();
