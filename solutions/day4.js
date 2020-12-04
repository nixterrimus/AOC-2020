const fs = require("fs");

function sampleInput() {
  return `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`;
}

function realInput() {
  return fs.readFileSync("./inputs/day4.txt", "utf8").trim();
}

function parsePassport(input) {
  return input
    .split(" ")
    .map((i) => i.split(":"))
    .reduce((result, item) => {
      const key = item[0];
      const value = item[1];

      var nextResult = {
        ...result,
      };
      nextResult[key] = value;
      return nextResult;
    }, {});
}

function isValidPassport(passport) {
  return (
    containRequiredFields(passport) &&
    isValidBirthYear(passport) &&
    isValidIssuanceYear(passport) &&
    isValidExpirationyear(passport) &&
    isValidHeight(passport) &&
    isValidHairColor(passport) &&
    isValidEyeColor(passport) &&
    validPassportId(passport)
  );
}

function validPassportId(passport) {
  const field = passport["pid"];
  return field.length == 9 && !!parseInt(field);
}

function isValidHeight(passport) {
  const field = passport["hgt"];
  const height = field.match(/[\d]+/)[0];
  if (field.endsWith("in")) {
    return height >= 59 && height <= 76;
  }

  return height >= 150 && height <= 193;
}

function isValidHairColor(passport) {
  const field = passport["hcl"];
  return field.length == 7 && field.match(/#[0-9a-f]+/);
}

function isValidEyeColor(passport) {
  const field = passport["ecl"];
  const validColors = "amb blu brn gry grn hzl oth".split(" ");
  return validColors.includes(field);
}

function isValidExpirationyear(passport) {
  const year = parseInt(passport["eyr"]);
  return year >= 2020 && year <= 2030;
}

function isValidIssuanceYear(passport) {
  const year = parseInt(passport["iyr"]);
  return year >= 2010 && year <= 2020;
}

function isValidBirthYear(passport) {
  const birthYear = parseInt(passport["byr"]);
  return birthYear >= 1920 && birthYear <= 2002;
}

function containRequiredFields(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return requiredFields.reduce((isValid, field) => {
    const containsfield = !!passport[field];
    return isValid && containsfield;
  }, true);
}

function log(a) {
  console.log(a);
  console.log();
  return a;
}

function countTrueValues(total, item) {
  if (item) {
    return total + 1;
  }
  return total;
}

function main() {
  const passports = realInput()
    .trim()
    .split("\n\n")
    .map((i) => i.replace(/[\s]+/g, " "))
    .map(parsePassport);

  const output = passports
    .map(containRequiredFields)
    .reduce(countTrueValues, 0);

  const output2 = passports.map(isValidPassport).reduce(countTrueValues, 0);

  console.log(output);
  console.log(output2);
}

main();
