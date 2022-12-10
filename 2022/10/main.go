package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func checkCycle(cycle, x int) int {
	if cycle%40 == 20 && cycle <= 220 {
		return cycle * x
	}
	return 0
}

func part1(lines []string) int {
	cycle, sum, x := 0, 0, 1
	for _, line := range lines {
		cycle++
		sum += checkCycle(cycle, x)
		split := strings.Split(line, " ")
		if split[0] == "addx" {
			cycle++
			sum += checkCycle(cycle, x)
			nr, _ := strconv.Atoi(split[1])
			x += nr
		}
	}
	return sum
}

func drawCRT(position, sprite int) string {
	var str string
	if Abs(position%40-sprite) <= 1 {
		str = "#"
	} else {
		str = "."
	}
	if (position+1)%40 == 0 {
		str += "\n"
	}
	return str
}

func part2(lines []string) string {
	cycle, x, crt := 0, 1, ""
	for _, line := range lines {
		cycle++
		crt += drawCRT(cycle-1, x)
		split := strings.Split(line, " ")
		if split[0] == "addx" {
			cycle++
			crt += drawCRT(cycle-1, x)
			nr, _ := strconv.Atoi(split[1])
			x += nr
		}
	}
	return crt
}

func main() {
	rawInput, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.Trim(string(rawInput), "\n"), "\n")

	fmt.Println("Part 1:", part1(input))
	fmt.Print("Part 2:\n", part2(input))
}
