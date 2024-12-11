input = document.querySelector("pre").textContent.trim().split("\n")
reports = []
let counter = 0
for (const line of input) {
    numbers = line.split(" ").map(x => +x)
    invert = numbers[0] - numbers[1] > 0 ? 1 : -1
    counter += numbers.some((n, i, arr) => i > 0 && (((arr[i-1] - n) * invert) > 3 || (((arr[i-1] - n) * invert) < 1))) ? 0 : 1;
}
console.log(`Result: ${counter}`)
