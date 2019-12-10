const inputs = document.querySelector("pre").textContent.trim().split("\n")

//A

const direction = {
    "D": "y",
    "U": "y",
    "R": "x",
    "L": "x",
}

const maps = [];
for (const input of inputs) {
    const map = [];
    let currentPoint = {
        x: 0,
        y: 0,
    }

    for (const i of input.split(",")) {
        let dir = i[0];
        const val = i.substring(1);

        let inv = 1;
        if (["D", "L"].includes(dir)) {
            inv = -1;
        }
        const add = {
            x: 0,
            y: 0
        }
        dir = direction[dir];
        add[dir] = inv * val;

        const startPoint = currentPoint[dir]
        while (currentPoint[dir] != startPoint + add[dir]) {
            currentPoint[dir] += inv;
            map.push({
                ...currentPoint
            });
        }
    }
    maps.push(map);
}
const map1 = maps[0];
const map2 = maps[1];
const crossAt = map1.filter(a => map2.find(b => b.x == a.x && b.y == a.y));
const nearest = crossAt.reduce((a, b) => ((Math.abs(a.x) + Math.abs(a.y) < (Math.abs(b.x) + Math.abs(b.y)) ? a : b)))
console.log("A:", nearest)

// B
const stepsCount = crossAt.map(p => map1.findIndex(a => p.x == a.x && p.y == a.y) + map2.findIndex(a => p.x == a.x && p.y == a.y) + 2);

const lowest = stepsCount.sort((a, b) => (a < b) ? -1 : 1)[0];
console.log("B:", lowest)