package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func makeRange(rangeStr string) []int {
	split := strings.Split(rangeStr, "-")
	min, err := strconv.Atoi(split[0])
	check(err)
	max, err := strconv.Atoi(split[1])
	check(err)
	a := make([]int, max-min+1)
	for i := range a {
		a[i] = min + i
	}
	return a
}

func intersect(a, b []int) []int {
	var res []int
	for _, nr1 := range a {
		for _, nr2 := range b {
			if nr1 == nr2 {
				res = append(res, nr1)
			}
		}
	}
	return res
}

func part1(input []string) int {
	score := 0
	for _, line := range input {
		split := strings.Split(line, ",")
		range1 := makeRange(split[0])
		range2 := makeRange(split[1])
		intersection := intersect(range1, range2)
		rangeLengths := []int{len(range1), len(range2)}
		sort.Ints(rangeLengths)
		if len(intersection) == rangeLengths[0] {
			score++
		}
	}
	return score
}

func part2(input []string) int {
	score := 0
	for _, line := range input {
		split := strings.Split(line, ",")
		range1 := makeRange(split[0])
		range2 := makeRange(split[1])
		intersection := intersect(range1, range2)
		rangeLengths := []int{len(range1), len(range2)}
		sort.Ints(rangeLengths)

		if len(intersection) > 0 {
			score++
		}
	}
	return score
}

func main() {
	fmt.Println("This is day 4!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n")

	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))

}
