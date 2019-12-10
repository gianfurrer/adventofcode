const input = document.querySelector("pre").textContent.trim();

const height = 6;
const width = 25;
const layerCount = input.length / (width * height);

const layers = [];
for (let l = 0; l < layerCount; ++l) {
    const layer = [];
    for (let h = 0; h < height; ++h) {
        layer.push(input.substr((l * width * height) + (h * width), width));
    }
    layers.push(layer);
}


// A
const selectedLayer = layers.map((l, i) => [{
    i: i,
    dig: l.join("").split("0").length - 1
}][0]).sort((a, b) => a.dig - b.dig)[0].i;

const digits = layers[selectedLayer].join("");
const res = (digits.split("1").length - 1) * (digits.split("2").length - 1);
console.log("A:", res);

// B
let finalLayer = [...layers[0]].map(l => l.split(""));
for (let l = 1; l < layers.length; ++l) {
    for (let h = 0; h < layers[l].length; ++h) {
        for (let d = 0; d < layers[l][h].length; ++d) {
            if (finalLayer[h][d] == 2) {
                finalLayer[h][d] = layers[l][h][d]
            }
        }
    }
}

const print = (layer) => {
    let image = ""
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            image += layer[y][x] == 1 ? "█" : " "
        }
        image += "\n"
    }
    console.log(image)
}
console.log("B:")
print(finalLayer)