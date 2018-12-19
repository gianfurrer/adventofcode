input = document.querySelector("pre").textContent.trim().split("\n")
console.log("Debug")
initArea = []
for (let y = 0; y < input.length; ++y) {
	for (let x = 0; x < input[y].length; ++x) {
		initArea.push({x:x,y:y,acre: input[y][x]})
    }
}

areas = [];
areas[0] = initArea;
minutes = 10;
for (let m = 1; m <= minutes; ++m) {
	const previousArea = areas[m-1];
	const area = [previousArea.length]
	for (let i = 0; i < previousArea.length; ++i) {
		const acre = previousArea[i];
		const adjacent = previousArea.filter(a => a.x >= acre.x -1 && a.x <= acre.x+1 && a.y >= acre.y-1 && a.y <= acre.y+1 && !(a.y == acre.y && a.x == acre.x)).map(a => a.acre)
        const futureAcre = {x:acre.x,y:acre.y,acre:acre.acre};
        switch (acre.acre) {
            case ".":
				if (adjacent.filter(a => a == "|").length >= 3) {
					futureAcre.acre = "|";
				}
				break;
            case "|":
				if (adjacent.filter(a => a == "#").length >= 3) {
					futureAcre.acre = "#";
				}
				break;
			case "#":
				if (adjacent.filter(a => a == "#").length < 1 || adjacent.filter(a => a == "|").length < 1) {
					futureAcre.acre = ".";
				}
				break;
		}
		area[i] = futureAcre;
    }
    areas.push(area);

}

console.log("Part 1: "+areas[minutes].filter(a => a.acre == "#").length * areas[minutes].filter(a => a.acre == "|").length)
