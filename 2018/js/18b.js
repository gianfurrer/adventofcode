//input = document.querySelector("body > main > article > pre > code").textContent.trim().split("\n").slice(1, 11)
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
repeatingMinutes = [];
count = 0;
m = 1;
json = "";
while (count < 2) {
	if (!(m%100)) console.log(m)
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
	area.json = JSON.stringify(area);
	if (json == area.json || (!json && areas.find(a => a.json == area.json))){
		repeatingMinutes.push(m);
		count++;
		json = area.json;
    }
    areas.push(area);
	++m;
}


difference = repeatingMinutes[1]-repeatingMinutes[0];
i = repeatingMinutes[0];
totalMinutes = 1000000000
while (i < totalMinutes) {
	i += difference;
}
number = repeatingMinutes[0]+(totalMinutes-(i-difference));
acres = areas[number].map(a => a.acre);
console.log(acres.filter(a => a == "#").length * acres.filter(a => a == "|").length)
