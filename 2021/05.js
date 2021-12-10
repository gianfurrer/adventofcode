const input = $("pre").textContent.trim().split("\n");

// === A ===
{
  const map = {}
  const lines = input.map(l => l.split(" -> ").map(e => e.split(",")));
  for (const line of lines) {
    const [[x0, y0], [x1, y1]] = line;
    if (y0 == y1) {
      const min = Math.min(...[+x0, +x1]);
      const max = Math.max(...[+x0, +x1]);
      for (let x = min; x <= max; ++x) {
        const k = x + ":" + y0;
        map[k] = map[k] ? map[k] + 1 : 1;
      }
    } else if (x0 == x1) {
      const min = Math.min(...[+y0, +y1]);
      const max = Math.max(...[+y0, +y1]);
      for (let y = min; y <= max; ++y) {
        const k = x0 + ":" + y;
        map[k] = map[k] ? map[k] + 1 : 1;
      }
    }
  }
  console.log("A:", Object.values(map).filter(n => n >= 2).length);
}

// === B ===
{
  const map = {}
  const lines = input.map(l => l.split(" -> ").map(e => e.split(",")));
  for (const line of lines) {
    const [[x0, y0], [x1, y1]] = line;
    if (y0 == y1) {
      const min = Math.min(...[+x0, +x1]);
      const max = Math.max(...[+x0, +x1]);
      for (let x = min; x <= max; ++x) {
        const k = x + ":" + y0;
        map[k] = map[k] ? map[k] + 1 : 1;
      }
    } else if (x0 == x1) {
      const min = Math.min(...[+y0, +y1]);
      const max = Math.max(...[+y0, +y1]);
      for (let y = min; y <= max; ++y) {
        const k = x0 + ":" + y;
        map[k] = map[k] ? map[k] + 1 : 1;
      }
    }
    else {
      const invertX = +x0 < +x1 ? 1 : -1;
      const invertY = +y0 < +y1 ? 1 : -1;
      for (let x = +x0, y = y0; (invertX + 1 ? x <= x1 : x >= x1) && (invertY + 1 ? y <= y1 : y >= y1); x += invertX, y += invertY) {
        const k = x + ":" + y;
        map[k] = map[k] ? map[k] + 1 : 1;
      }
    }
  }
  console.log("A:", Object.values(map).filter(n => n >= 2).length);
}
