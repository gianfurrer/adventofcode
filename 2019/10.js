const input = document.querySelector("pre").textContent.trim().split("\n")

const asteroids = [];
for (let y = 0; y < input.length; ++y) {
    for (let x = 0; x < input[y].length; ++x) {
        if (input[y][x] == "#") {
            asteroids.push({
                x: x,
                y: y,
                sees: []
            })
        }
    }
}
setAsteroids = (asteroid) => {
    asteroid.sees = [];
    for (let checking of asteroids) {
        if (checking != asteroid) {
            let blocking = false;
            if (asteroid.x == checking.x) {
                const min = Math.min(asteroid.y, checking.y)
                const max = Math.max(asteroid.y, checking.y)
                blocking = !!(asteroids.findIndex(a => a.x == asteroid.x && min < a.y && max > a.y) + 1);
            } else if (asteroid.y == checking.y) {
                const min = Math.min(asteroid.x, checking.x)
                const max = Math.max(asteroid.x, checking.x)
                blocking = !!(asteroids.findIndex(a => a.y == asteroid.y && min < a.x && max > a.x) + 1);
            } else {
                const xDiff = asteroid.x - checking.x;
                const yDiff = asteroid.y - checking.y;
                const steps = Math.min(Math.abs(xDiff), Math.abs(yDiff));
                const xSteps = xDiff / steps;
                const ySteps = yDiff / steps;
                for (let s = 1; s < steps; ++s) {
                    const x = asteroid.x - (xSteps * s)
                    const y = asteroid.y - (ySteps * s)
                    if (asteroids.findIndex(a => a.x == x && a.y == y) + 1) {
                        blocking = true;
                    }
                }
            }

            if (!blocking) {
                asteroid.sees.push(checking);
            }
        }
    }
}

// A
for (let asteroid of asteroids) {
    setAsteroids(asteroid)
}

const asteroid = asteroids.sort((a, b) => b.sees.length - a.sees.length)[0];
console.log("A:", asteroid.sees.length)

// B
calcAngle = (a1, a2) => {
    // Calculate the angle of the astroids to sort them
    let angle = (Math.atan2(a1.y - a2.y, a1.x - a2.x) * 180) / Math.PI;
    (angle < 0) && (angle += 360);
    angle -= 90;
    (angle < 0) && (angle += 360);
    return angle;
}

asteroids.splice(asteroids.indexOf(asteroid), 1) // Remove asteroids from list
const vaporized = [];
while (asteroids.length) {

    for (let a of asteroid.sees.sort((a, b) => calcAngle(asteroid, a) - calcAngle(asteroid, b))) {
        vaporized.push(asteroids.splice(asteroids.indexOf(a), 1)[0])
    }
    setAsteroids(asteroid);
}
console.log("B", vaporized[199].x * 100 + vaporized[199].y)