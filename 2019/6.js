const input = document.querySelector("pre").textContent.trim().split("\n")
const map = [];
for (let i of input) {
    keyVal = i.split(")");
    const orbit = keyVal[1];
    const orbits = keyVal[0];
    const index = map.findIndex(o => o.orbit == orbit);
    if (index + 1) {
        map[index].orbits.push(orbits)
    } else {
        map.push({
            orbit: orbit,
            orbits: [orbits]
        })
    }

}

let currOrbits = map.filter(o => o.orbits.includes("COM"));
while (currOrbits.length) {
    const cOrbits = [
        ...currOrbits
    ];
    currOrbits = [];
    for (let o of cOrbits) {
        const parents = map.filter(p => p.orbits.includes(o.orbit));
        for (let p of parents) {
            p.orbits = p.orbits.concat(o.orbits);
            currOrbits.push(p);
        }
    }
}

// A
console.log("A:", map.map(m => m.orbits.length).reduce((a, b) => a + b))

// B 
const san = map.find(o => o.orbit == "SAN")
const you = map.find(o => o.orbit == "YOU")
const connectedOrbit = you.orbits.find(o => san.orbits.includes(o))
const findPath = (orbit, orb) => orbit.orbits.slice(0, orbit.orbits.findIndex(o => o == orb)).length
let length = findPath(you, connectedOrbit) + findPath(san, connectedOrbit)
console.log("B:", length)