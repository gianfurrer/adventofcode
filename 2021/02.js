const input = document.querySelector("pre").innerText.trim().split("\n").map(i => i.split(" "));

// === A ===
{
  let h = 0;
  let d = 0;
  for (const i of input) {
    const value = +i[1];
    switch (i[0]) {
      case "forward":
        h += value;
        break;
      case "down":
        d += value;
        break;
      case "up":
        d -= value;
        break;
    }
  }
  console.log("A:", h * d);
}

// === B ===
{
  let h = 0;
  let d = 0;
  let aim = 0;
  for (const i of input) {
    const value = +i[1];
    switch (i[0]) {
      case "forward":
        h += value;
        d += value * aim;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  }
  console.log("B:", h * d);
}
