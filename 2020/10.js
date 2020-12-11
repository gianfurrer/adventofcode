  // Combined

  const input = $("pre").textContent.trim().split("\n").map(n => +n);

  // A

  const a = (numbers) => {
    const targetJoltage = numbers.sort((a,b) => b - a)[0] + 3
    numbers.push(targetJoltage);
    const sorted = numbers.sort((a,b) => a - b);

    const diffs = {
    1: 0, 2: 0, 3: 0
    };

    sorted.reduce((a,b) => {
    diffs[b-a]++
    return b;
    }, 0);
    return diffs[1] * diffs[3]
  }

  console.log("A:", a([...input]));

  // B

  const b = (numbers) => {
    const targetJoltage = numbers.sort((a,b) => b - a)[0] + 3;
    const memo = {};
    const sorted = numbers.sort((a,b) => b - a);
    sorted.push(0);

    memo[targetJoltage] = 1;

    for (let n of sorted) {
      memo[n] = (memo[n+1] || 0) + (memo[n+2] || 0) + (memo[n+3] || 0)
    }

    return memo[0];
  }

  console.log("B:", b([...input]));