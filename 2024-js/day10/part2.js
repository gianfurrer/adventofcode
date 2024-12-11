input = document.querySelector("pre").textContent.trim().split("\n")
map = {}
xLen = input[0].length
yLen = input.length
for (let y = 0; y < input.length; ++y) {
    input[y].split("").forEach((val, x) => map[[x,y]] = +val)
}

trailheads = []
Object.values(map).forEach((val, i) => val == 0 && trailheads.push([i % xLen, Math.floor(i / xLen)]))

trailhead = trailheads[0]
console.log(`Trailhead: ${trailhead}`)

const getAdjacent = (coord) => [[0, 1], [1, 0], [0, -1], [-1, 0]].map(o => [coord[0] + o[0], coord[1] + o[1]])
let counter = 0;
for (const trailhead of trailheads)
{
    score = []
    stack = [trailhead]
    while (stack.length) {
        const current = stack.shift()
        const val = map[current]
        val == 9 && score.push(current);
        getAdjacent(current).forEach(a => a in map && map[a] - val == 1 && stack.push(a))
    }
    counter += score.length
}
console.log(`Result: ${counter}`)
