const input = document.querySelector("pre").textContent.trim().split("\n");

const part1 = () => {
    const max = {
        "green": 13,
        "red": 12,
        "blue": 14
    }
    let sum = 0;
    for (let line of input) {
        let valid = true;
        const [_, gameNr, cubesStr] = line.match(/Game (\d+): (.*)/);
        const sets = cubesStr.split(";");
        for (let set of sets) {
            const cubes = set.split(",");
            for (let cube of cubes) {
                const [__, amount, color] = cube.match(/(\d+) (\w+)/);
                if (+amount > max[color]) {
                    valid = false; 
                    break;
                }   
            }
            if (!valid) break;
        }
        if (valid) sum += +gameNr    
    }
    console.log(sum)
}

const part2 = () => {
    let sum = 0;
    for (let line of input) {
        let min = {
            "green": 0,
            "red": 0,
            "blue": 0,
        };
        const [_, gameNr, cubesStr] = line.match(/Game (\d+): (.*)/);
        const sets = cubesStr.split(";");
        for (let set of sets) {
            const cubes = set.split(",");
            for (let cube of cubes) {
                const [__, amount, color] = cube.match(/(\d+) (\w+)/);
                if (+amount > min[color]) min[color] = +amount;
            }
        }
        sum += Object.values(min).reduce((a, b) => a * b);
    }
    console.log(sum)
}
part2()