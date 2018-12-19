generationCount = generationCount = 1000;
input = document.querySelector("pre").textContent.trim().split("\n")
initialState = Array.from(input[0].replace("initial state: ", "")).map((s, i) => [{index: i, plant: s }][0]);
input.splice(0, 2)

combinations = input.map(i => [{input: i.split(" ")[0], result: i.split(" ")[2]}][0])
generations = [];
gSums = [];
generations.push(initialState);
for (let g = 0; g < generationCount; ++g) {
    const currentGeneration = generations[g]
    generations.push([])
    const length = Math.max(...currentGeneration.map(cg => cg.index))+2;
	currentGeneration.sort((a,b) => a.index - b.index)
    for (let i = currentGeneration.find(is => is.plant == "#").index-2; i < length; ++i) {
        let state = currentGeneration.find(is => is.index == i);
        if (!state) {
            state = {index: i, plant: "."};
            index = currentGeneration.indexOf(currentGeneration.find(is => is.index > i))+1 || currentGeneration.length+1;
            currentGeneration.splice(index-1, 0, state);
        }

        let string = "";
        for (let y = -2; y <= 2; ++y) {
            const pot = currentGeneration.find(is => is.index == i+y);
            if (!pot) {
                string += "."
            }
            else {
                string += pot.plant;
            }
        }
        const combination = combinations.find(c => c.input == string);
        let plant = ".";
        if (combination) {
            plant = combination.result;
        }
        generations[g+1].push({index: i, plant: plant})
    }
    gSums.push(currentGeneration.filter(g => g.plant == "#").map(g => g.index).reduce((a,b) => a+b))
}
gSums.push(generations[generationCount].filter(g => g.plant == "#").map(g => g.index).reduce((a,b) => a+b))

multiplier = 10;
plantSum = gSums[generationCount];
diff = (gSums[generationCount] - gSums[generationCount-(generationCount/10)]) * multiplier
plantSum += diff*(multiplier-1)
for (let i = generationCount*multiplier; i < 50000000000; i += generationCount*multiplier) {
	plantSum += diff*multiplier
}

console.log(plantSum)1000;
input = document.querySelector("pre").textContent.trim().split("\n")
initialState = Array.from(input[0].replace("initial state: ", "")).map((s, i) => [{index: i, plant: s }][0]);
input.splice(0, 2)

combinations = input.map(i => [{input: i.split(" ")[0], result: i.split(" ")[2]}][0])
generations = [];
gSums = [];
generations.push(initialState);
for (let g = 0; g < generationCount; ++g) {
    const currentGeneration = generations[g]
    generations.push([])
    const length = Math.max(...currentGeneration.map(cg => cg.index))+2;
	currentGeneration.sort((a,b) => a.index - b.index)
    for (let i = currentGeneration.find(is => is.plant == "#").index-2; i < length; ++i) {
        let state = currentGeneration.find(is => is.index == i);
        if (!state) {
            state = {index: i, plant: "."};
            index = currentGeneration.indexOf(currentGeneration.find(is => is.index > i))+1 || currentGeneration.length+1;
            currentGeneration.splice(index-1, 0, state);
        }

        let string = "";
        for (let y = -2; y <= 2; ++y) {
            const pot = currentGeneration.find(is => is.index == i+y);
            if (!pot) {
                string += "."
            }
            else {
                string += pot.plant;
            }
        }
        const combination = combinations.find(c => c.input == string);
        let plant = ".";
        if (combination) {
            plant = combination.result;
        }
        generations[g+1].push({index: i, plant: plant})
    }
    gSums.push(currentGeneration.filter(g => g.plant == "#").map(g => g.index).reduce((a,b) => a+b))
}
gSums.push(generations[generationCount].filter(g => g.plant == "#").map(g => g.index).reduce((a,b) => a+b))

multiplier = 10;
plantSum = gSums[generationCount];
diff = (gSums[generationCount] - gSums[generationCount-(generationCount/10)]) * multiplier
plantSum += diff*(multiplier-1)
for (let i = generationCount*multiplier; i < 50000000000; i += generationCount*multiplier) {
	plantSum += diff*multiplier
}

console.log(plantSum)
