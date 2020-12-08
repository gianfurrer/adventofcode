// Combined

const input = $("pre").textContent.trim().split("\n");

const run = (lines) => {
  let accumulator = 0;
  let success = true;
  const runHistory = [];
  for (let i = 0; i < lines.length; ++i) {
    if (runHistory.includes(i)) {
      success = false;
      break;
    }
    runHistory.push(i);
    const operation = lines[i][0];
    const value = +lines[i][1];
    switch(operation) {
      case "acc":
        accumulator += value;
        break;
      case "jmp":
        i += value-1;
        break;
      case "nop":
        break;
    }
  }
  return {accumulator, success};
}

// A

const a = (lines) => {
  lines = lines.map(l => l.split(" "));
  return run(lines).accumulator;
}

console.log("A:", a([...input]));

// B

const b = (lines) => {
  let lastRun = {success: false, accumulator: 0};
  let i = -1;
  do {
    ++i;
    const newLines = lines.map(l => l.split(" "));
    if (newLines[i][0] == "nop") {
      newLines[i][0] = "jmp";
    } else if (newLines[i][0] == "jmp") {
      newLines[i][0] = "nop";
    }
    else {
      continue;
    }
    lastRun = run(newLines);
  } while (!lastRun.success)
  return lastRun.accumulator;
}

console.log("B:", b([...input]));