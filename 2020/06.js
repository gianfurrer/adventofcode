// Combined

const input = $("pre").textContent.trim().split("\n\n");

// A

const a = (groups) => {
  return groups.reduce((a,group) => group.replace(/\n/g, "").split("").filter((v, i, a) => a.indexOf(v) === i).length, 0);
}

console.log("A: ", a([...input]));



// B

const b = (groups) => {
  return groups.reduce((a,group) => a + group.split("\n").map(g => g.split("")).reduce((a, b) => a.filter(c => b.includes(c))).length, 0);
}

console.log("B: ", b([...input]));

