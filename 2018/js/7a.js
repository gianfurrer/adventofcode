input = document.querySelector("pre").textContent.split("\n")
input.pop()

letters = [];
for (let i = 0; i < input.length; ++i) {
	const splitted = input[i].split(" ");
	const dependency = splitted[1];
	if (!letters.find(l => l.letter == dependency)) {
		letters.push({letter: dependency, dependencies: []})
	}

	const curLetter = splitted[7];
	let letter = letters.find(l => l.letter == curLetter);
	if (!letter) {
    	letter = {letter: curLetter, dependencies: [] };
		letters.push(letter)
    }
	letter.dependencies.push(dependency);
}

string = "";
while (letters.length) {
	letters.sort((a,b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))
    letters.sort((a,b) => a.dependencies.length - b.dependencies.length)
	const letter = letters[0];
	for (let i = 0; i < letters.length; ++i) {
		letters[i].dependencies = letters[i].dependencies.filter(d => d != letter.letter);
    }
	string += letter.letter
	letters = letters.slice(1, letters.length);
}
console.log(string)
