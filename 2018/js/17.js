input = document.querySelector("body > main > article > pre:nth-child(6) > code").textContent.trim().split("\n")
console.log("Not working")
coords = [];
for (let i = 0; i < input.length; ++i) {
	const curInput = input[i];
	const key1 = curInput[0];
	const val1 = parseInt(curInput.split("=")[1].split(",")[0]);
	const key2 = curInput.split(" ")[1][0];
	const valRange2 = curInput.split(" ")[1].split("=")[1];
	const range = valRange2.split("..").map(s => parseInt(s))
	for (let k = range[0]; k <= range[1]; ++k) {
		const coord = {};
		coord[key1] =  val1;
        coord[key2] = k;
		coord["mat"] = "#"
		coords.push(coord);
	}
}
waterSpring = {x: 500, y: 0}
print = (waterC) => {
    string = "";
    for (let y = minCoords.y; y <= maxCoords.y; ++y) {
        string += "\n";
        for (let x = minCoords.x; x <= maxCoords.x; ++x) {
			if (waterC.find(w => w.x == x && w.y == y)) {
				string += "|";
			}
			else {
				const curCoord = coords.find(c => c.x == x && c.y == y);
				if (curCoord) {
					string += curCoord.mat;
				}
				else {
					string += "."
                }
            }
        }
    }
	console.log(string)
}

waterCoords = [];
for (let w = 0; w < 30; ++w) {
    minCoords = {x: Math.min(...coords.map(c => c.x)), y: Math.min(...coords.map(c => c.y))}
    maxCoords = {x: Math.max(...coords.map(c => c.x)), y: Math.max(...coords.map(c => c.y))}
    const flows = [];
    flows.push({x: waterSpring.x, y: waterSpring.y, lB: false, rB: false});
    let coord = {};
	for (let f = 0; f < flows.length; ++f) {
		const flow = flows[f];
		let invert = 1;
		let floating = true;
		let floatX = 0;
		let floatY = 0;
		while (floating) {
			const waterC = []
			if ((!coords.find(c => c.y == flow.y+floatY+1 && c.x == flow.x+floatX) && !flow.rB) || (!coords.find(c => c.y == flow.y+floatY+1 && c.x == flow.x-floatX) && !flow.lB)) {
				flow.y++;
				if (!flow.lB) {
					waterC.push({x: flow.x-floatX, y: flow.y+floatY});
                }
                else if (!flow.rB) {
                    waterC.push({x: flow.x+floatX, y: flow.y+floatY});
                }
				canReset = true;
            }
			else {
				if (canReset) {
					if (!flow.lB) {
						flow.x-=floatX;
                    }
                    else if (!flow.rB) {
                        flow.x+=floatX;
                    }
					floatX = 0;
                    flow.rB = flow.lB = false;
                    canReset = false;
                }
				let fX = false;
                if (!flow.lB && !coords.find(c => c.y == flow.y+floatY && c.x == flow.x-floatX-1)) {
                    waterC.push({x: flow.x-floatX-1, y: flow.y+floatY});
                    fX = true
                    invert = -1;
                }
                else {
                    flow.lB = true;
                }
                if (!flow.rB && !coords.find(c => c.y == flow.y+floatY && c.x == flow.x+floatX+1)) {
					if (fX) {
						flows.push({x: flow.x+floatX+1, y: flow.y+floatY, rB: false, lB: true})
						flow.rB = true;
						invert = 1;
					}
					else {
						waterC.push({x: flow.x+floatX+1, y: flow.y+floatY});
                    	fX= true;
					}
                }
                else {
                    flow.rB = true;
                }
                if(fX) {
                    floatX++;
                }
                else {
                    floating = false;
                    coord = {x: flow.x+(floatX*invert), y: flow.y+floatY, mat: "~"}
                }
            }
            if (flow.y+floatY > maxCoords.y) {
				floating = false;
			}
            for (let i = 0; i < waterC.length; ++i) {
            	if (!waterCoords.find(wc => wc.x == waterC[i].x && wc.y == waterC[i].y)) 					{
					waterCoords.push({x: waterC[i].x, y: waterC[i].y})
				}
			}
        }
    }
	coords.push(coord);
    print([]);
}
