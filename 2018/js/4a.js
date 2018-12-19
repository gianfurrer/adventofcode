const lines = document.querySelector("pre").textContent.split("\n");

var objects = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const object = {
    date: new Date(line.substring(1, 17)),
    text: line.substring(19)
  };
  objects.push(object);
}

objects.sort((a, b) => a.date - b.date)

let currentGuard;
let guards = [];
for (let i = 0; i < objects.length; ++i) {
  const action = objects[i].text
  if (action.includes("begins shift")) {
    const guardId = action.split(" ")[1].replace("#", "");
    currentGuard = guards.find(g => g.id == guardId)
    if (!currentGuard) {
      currentGuard = {id: guardId, sleepsAt: []};
      guards.push(currentGuard);
    }
  }
  else if (action.includes("falls asleep")) {
    currentGuard.sleepsAt.push(objects[i].date.getMinutes())
  }
  else if (action.includes("wakes up")) {
    for (let s = currentGuard.sleepsAt[currentGuard.sleepsAt.length-1]+1; s < objects[i].date.getMinutes(); ++s) {
      currentGuard.sleepsAt.push(s);
    }
  }
}

let badGuard = guards.sort((a, b) => b.sleepsAt.length - a.sleepsAt.length)[0]
let sleepingMinutes = [];
for (let i = 0; i < badGuard.sleepsAt.length; ++i) {
  const minute = badGuard.sleepsAt[i];
  let sleepingMinute = sleepingMinutes.find(sM => sM.minute === minute);
  if (!sleepingMinute) {
    sleepingMinute = {minute: minute, count: 0}
    sleepingMinutes.push(sleepingMinute)
  }
  sleepingMinute.count++;
}
let minute = sleepingMinutes.sort((a,b) => b.count - a.count)[0].minute;
console.log(badGuard.id * minute)

