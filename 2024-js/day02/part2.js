input = document.querySelector("pre").textContent.trim().split("\n")
reports = []
let counter = 0
for (const line of input) {
    numbers = line.split(" ").map(x => +x)
    let isSafe = false;
    let index = 0;
    for (let index = 0; index < numbers.length && !isSafe; ++index) {
        mNumbers = numbers.filter((_, i) => i !== index);
        invert = mNumbers[0] - mNumbers[1] > 0 ? 1 : -1
        isSafe = !mNumbers.some((n, i, arr) => i > 0 && (((arr[i-1] - n) * invert) > 3 || (((arr[i-1] - n) * invert) < 1)));
    }
    counter += isSafe ? 1 : 0
}
console.log(`Result: ${counter}`)
