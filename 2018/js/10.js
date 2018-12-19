input = document.querySelector("pre").textContent.split("\n")
input.pop();
input = input.map(i => {
	const split = i.split(",");
	return [{
		positionX: parseInt(i.split(",")[0].replace("position=<", "").trim()),
        positionY: parseInt(i.split(",")[1].split(">")[0].trim()),
		velocityX: parseInt(i.split("<")[2].split(",")[0].trim()),
		velocityY: parseInt(i.split("<")[2].split(",")[1].replace(">", "").trim())
	}][0]
})

distinct = (value, index, self) => {
	return self.indexOf(value) === index;
}

seconds = 0;

nextSecond = () => {
	for (let y = 0; y < input.length; ++y) {
		const point = input[y];
		point.positionX += point.velocityX;
		point.positionY += point.velocityY;
    }
    minCoords = {x: Math.min(...input.map(i => i.positionX)), y: Math.min(...input.map(i => i.positionY))}
	maxCoords = {x: Math.max(...input.map(i => i.positionX)), y: Math.max(...input.map(i => i.positionY))}
	seconds++;
}

do {
	nextSecond();
} while((Math.abs(minCoords.y - maxCoords.y) + Math.abs(minCoords.x - maxCoords.x)) > 70)

minCoords = {x: Math.min(...input.map(i => i.positionX)), y: Math.min(...input.map(i => i.positionY))}
maxCoords = {x: Math.max(...input.map(i => i.positionX)), y: Math.max(...input.map(i => i.positionY))}
string = "";
for (let y = minCoords.y-5; y < maxCoords.y+5; ++y) {
    string += "\n";
    for (let x = minCoords.x-5; x < maxCoords.x+5; ++x) {
        if (input.find(i => i.positionX == x && i.positionY == y)) {
            string+= "#";
        }
        else {
            string += ".";
        }
    }
}
console.log(string);
console.log("Seconds: "+seconds)
