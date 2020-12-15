from collections import defaultdict

MY_INPUT = "9,19,1,6,0,5,4"

inputNrs = [int(n) for n in MY_INPUT.split(",")]
def solve(nrs, rounds):
  lastNr, mem = nrs[-1:][0], defaultdict(lambda: r, {nr:i+1 for i, nr in enumerate(nrs)})
  for r in range(len(nrs), rounds):
    mem[lastNr], lastNr = r, r-mem[lastNr]
  return lastNr
print("A:", solve(inputNrs, 2020))  
print("B:", solve(inputNrs, 30000000))
