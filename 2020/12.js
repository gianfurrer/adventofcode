// Combined

const input = $("pre").textContent.trim().split("\n");

// A

const a = (instructions) => {
  const data = { 0: 0, 1: 0};
  const directions = {0: 1, 1: 1, 2: -1, 3: -1}
  let facing = 101;
  for (const instruction of instructions) {
    const action = instruction.substr(0,1);
    let value = +instruction.substr(1);

    switch (action) {
      case "N":
        data[0] += value;
        break;
      case "S":
        data[0] -= value;
        break;
      case "E":
        data[1] += value;
        break;
      case "W":
        data[1] -= value;
        break;
      case "F":
        data[facing % 2] += (directions[facing % 4] *value);
        break; 
      case "R":
        facing += value / 90;
        break;
      case "L":
        facing -= value / 90;
        break;
    }
    
  }

  return Math.abs(data[0]) + Math.abs(data[1]);
}

console.log("A:", a([...input]));

// B

const b = (instructions) => {


  const position = { 0: 0, 1: 0};
  let waypoint = {0: 1, 1: 10};
  let newWaypoint;
  const directions = {0: 1, 1: 1, 2: -1, 3: -1};
  for (const instruction of instructions) {
    const action = instruction.substr(0,1);
    let value = +instruction.substr(1);

    switch (action) {
      case "N":
        waypoint[0] += value;
        break;
      case "S":
        waypoint[0] -= value;
        break;
      case "E":
        waypoint[1] += value;
        break;
      case "W":
        waypoint[1] -= value;
        break;
      case "F":
        for (let i in waypoint) {
          position[i] += waypoint[i] * value;
        }
        break; 
      case "R":
        rotation = 1;
      case "L":
        if (!rotation) {
          rotation = -1;
        }
        rotation *= value / 90;
        newWaypoint = {}
        for (let i in waypoint) {
          const newI = +i-rotation+100;
          newWaypoint[i] = waypoint[newI%2] * directions[newI%4]
        }
        waypoint = newWaypoint;
        rotation = null;
        break;
    }
  }

  return Math.abs(position[0]) + Math.abs(position[1]);
}

console.log("B:", b([...input]));