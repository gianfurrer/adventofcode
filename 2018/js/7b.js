input = document.querySelector("pre").textContent.split("\n")
input.pop()

letters = [];
for (let i = 0; i < input.length; ++i) {
	const splitted = input[i].split(" ");
	const dependency = splitted[1];
	if (!letters.find(l => l.letter == dependency)) {
		letters.push({letter: dependency, time: dependency.charCodeAt(0)-4, dependencies: []})
	}

	const curLetter = splitted[7];
	let letter = letters.find(l => l.letter == curLetter);
	if (!letter) {
    	letter = {letter: curLetter, time: curLetter.charCodeAt(0)-4, dependencies: [] };
		letters.push(letter)
    }
	letter.dependencies.push(dependency);
}


workers = [];
for (let i = 0; i < 5; ++i) {
	workers.push({id: workers.length+1});
}

letters.sort((a,b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
letters.sort((a,b) => a.dependencies.length - b.dependencies.length)

string = "";
seconds = 0;
do {
	for (let i = 0; i < workers.length; ++i) {
		const worker = workers[i];
        if (worker.currentItem && !(--worker.currentItem.time)) {
            for (let i = 0; i < letters.length; ++i) {
                letters[i].dependencies = letters[i].dependencies.filter(d => d !== worker.currentItem.letter);
            }
            string += worker.currentItem.letter
			console.log(string);
			letters = letters.filter(l => l.letter != worker.currentItem.letter);
			worker.currentItem = undefined;
			letters.sort((a,b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
    		letters.sort((a,b) => a.dependencies.length - b.dependencies.length)
        }
	}

	for (let i = 0; i < workers.length; ++i) {
		const worker = workers[i];
		const freeLetter = letters.find(l => !l.busy)
		if (!worker.currentItem && freeLetter && !freeLetter.dependencies.length) {
			worker.currentItem = freeLetter;
			freeLetter.busy = true;
		}
    }

} while (letters.length && ++seconds)
console.log("Seconds: "+seconds);
