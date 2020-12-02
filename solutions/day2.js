const fs = require("fs");

/* Part I */

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

// Sample input "1-3 a"
function parsePolicyString(input) /* Policy */ {
  const tokens = input.split(" ");
  const countTokens = tokens[0].split("-");
  return {
    minCount: parseInt(countTokens[0]),
    maxCount: parseInt(countTokens[1]),
    repitant: tokens[1]
  }
}

function parsePasswordInput(input, policyParser) /* PasswordInput */ {
  const tokens = input.split(":")
  return {
    policy: policyParser(tokens[0]),
    password: tokens[1].trim()
  }
}

function isValidInput(str) {
  const passwordInput = parsePasswordInput(str, parsePolicyString)
    
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

function countValid(testFn){
  return (count, input) => {
    if (testFn(input)) {
      return count + 1
    }
    return count
  }
}

/* Part II */
/*
type AlternatePolicy {
  firstPosition: number,
  secondPosition: number,
  check: string
}
*/

// Sample input "1-3 a"
function parseAlternatePolicyString(input) /* AlternatePolicy */ {
  const tokens = input.split(" ");
  const countTokens = tokens[0].split("-");
  return {
    firstPosition: parseInt(countTokens[0]) - 1,
    secondPosition: parseInt(countTokens[1]) - 1,
    check: tokens[1]
  }
}

function isValidAlternateInput(str) {
  const passwordInput = parsePasswordInput(str, parseAlternatePolicyString)
    
  const target = passwordInput.policy.check;

 return (passwordInput.password[passwordInput.policy.firstPosition] == target ^ 
   passwordInput.password[passwordInput.policy.secondPosition] == target) > 0
}

// Main func

function main(){
  const input = fs.readFileSync("./inputs/day2.txt", "utf8")
    .split("\n")
    .filter(l => l.length > 0);
     
  const part1 = input.reduce(countValid(isValidInput), 0)
  const part2 = input.reduce(countValid(isValidAlternateInput), 0)

  console.log(part1)
  console.log(part2)
}

main();