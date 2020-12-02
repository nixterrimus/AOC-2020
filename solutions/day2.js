const fs = require("fs");

/*
type Policy {
  minCount: number,
  maxCount: number,
  repitant: string
}

type PasswordInput {
  policy: Policy,
  password: string
}
*/

// Sample input 1-3 a
function parsePolicyString(input) /* Policy */ {
  const tokens = input.split(" ");
  const countTokens = tokens[0].split("-");
  return {
    minCount: parseInt(countTokens[0]),
    maxCount: parseInt(countTokens[1]),
    repitant: tokens[1]
  }
}

function parsePasswordInput(input) /* PasswordInput */ {
  const tokens = input.split(":")
  return {
    policy: parsePolicyString(tokens[0]),
    password: tokens[1].trim()
  }
}

function isValidInput(passwordInput) {
  const targetRepitant = passwordInput.policy.repitant;
  const targetCount = passwordInput.password
                         .split('')
                         .reduce((count, char) => {
                            if (char == targetRepitant){
                              return count + 1
                            }
                            return count;
                          }, 0)
  return targetCount <= passwordInput.policy.maxCount && 
    targetCount >= passwordInput.policy.minCount;
}

function isValidRawInput(str){
  const parsed = parsePasswordInput(str)
  return isValidInput(parsed);
}

function countValid(testFn){
  return (count, input) => {
    if (testFn(input)) {
      return count + 1
    }
    return count
  }
}

module.exports.default = function(){
  const input = fs.readFileSync("./inputs/day2.txt", "utf8")
    .split("\n")
    .filter(l => l.length > 0)
    .reduce(countValid(isValidRawInput), 0)
  console.log(input)
}
