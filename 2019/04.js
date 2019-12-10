// A (r = 0) && B (r = 1)
const lowest = 125730;
const highest = 579381;
for (let r = 0; r < 2; ++r) {
    let count = 0;
    for (let i = lowest; i <= highest; ++i) {
        const s = i.toString();
        for (let y = 1; y < s.length; ++y) {
            if (s[y] < s[y - 1]) {
                y = s.length;
            } else if (y == 5) {
                for (let c = +s[0]; c <= 9; ++c) {
                    let l = (c + (c * 10)).toString();
                    if (s.includes(l)) {
                        if (!r || !s.includes((+l + (c * 100)).toString())) {
                            count++;
                        }
                        c = 10;
                    }
                }
            }
        }
    }
    console.log(String.fromCharCode((65 + r)) + ":", count)
}