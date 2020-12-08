const fs = require("fs");

function sampleInput() {
  return `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`.trim();
}

function realInput() {
  return fs.readFileSync("./inputs/day8.txt", "utf8").trim();
}

MAX_PROGRAM_COUNTER = 10_000;

//
/*
type ModifyAcc {
  type: "acc"
  lineNumber: number,
  delta: number
}

type Jump {
  type: "jmp"
  lineNumber: number,
  lineOffset: number
}

type NoOp {
  lineNumber: number
  type: 'nop',
  argument: number
}

type Command = ModifyAcc | Jump | NoOp
*/

function parseCommand(instruction, index) {
  const commandItems = instruction.split(" ");
  const commandType = commandItems[0];
  const command = {
    type: commandType,
    lineNumber: index,
  };

  if (commandType == "jmp") {
    return {
      ...command,
      lineOffset: parseInt(commandItems[1]),
    };
  } else if (commandType == "acc") {
    return {
      ...command,
      delta: parseInt(commandItems[1]),
    };
  } else if (commandType == "nop") {
    return {
      ...command,
      argument: parseInt(commandItems[1]),
    };
  }

  return command;
}

/*
type State = {
  currentLine: number,
  accValue: number
}
*/

function runCommand(state, commands) /* State */ {
  const nextCommandMaybe = commands.filter(
    (c) => c.lineNumber == state.currentLine
  );
  if (!nextCommandMaybe[0]) {
    return {
      ...state,
      isRunning: false,
      isCrashed: true,
    };
  }
  const command = nextCommandMaybe[0];
  var nextState;
  if (command.type == "nop") {
    nextState = {
      ...state,
      currentLine: state.currentLine + 1,
    };
  } else if (command.type == "jmp") {
    nextState = {
      ...state,
      currentLine: state.currentLine + command.lineOffset,
    };
  } else if (command.type == "acc") {
    nextState = {
      ...state,
      currentLine: state.currentLine + 1,
      accValue: state.accValue + command.delta,
    };
  }

  if (nextState.currentLine == commands.length) {
    nextState = {
      ...nextState,
      isRunning: false,
    };
  }

  return nextState;
}

function run(commands) {
  var seenLines = {};
  var state = {
    currentLine: 0,
    accValue: 0,
    isRunning: true,
    isCrashed: false,
  };

  var programCounter = 0;

  while (state.isRunning && !state.isCrashed) {
    programCounter += 1;
    state = runCommand(state, commands);
    if (!seenLines[state.currentLine]) {
      seenLines[state.currentLine] = true;
    } else {
      state.isCrashed = true;
    }

    if (programCounter == MAX_PROGRAM_COUNTER) {
      console.log("Exceeded maximum program counter");
      console.log(state);
      process.exit(1);
    }
  }

  return state;
}

function fixFaultyInstruction(commands) {
  for (var index = 0; index < commands.length; index++) {
    const command = commands[index];
    var testCommandStream = [...commands];
    var replacementCommand;

    if (command.type == "jmp") {
      replacementCommand = {
        lineNumber: index,
        type: "nop",
      };
    } else if (command.type == "nop") {
      replacementCommand = {
        lineNumber: index,
        type: "jmp",
        lineOffset: command.argument,
      };
    } else {
      replacementCommand = command;
    }

    testCommandStream[index] = replacementCommand;
    var result = run(testCommandStream);
    if (!result.isRunning && !result.isCrashed) {
      return result;
    }
  }
}

function main() {
  const commands = realInput().split("\n").map(parseCommand);
  const ouput = run(commands);
  console.log(ouput.accValue);
  const result2 = fixFaultyInstruction(commands);
  console.log(result2.accValue);
}

main();
