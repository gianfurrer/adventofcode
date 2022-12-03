package main

import (
	"fmt"
	"os"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func playRockPaperScissors(mine int, other int) int {
	if mine == other {
		return 3 + mine
	} else if mine == other%3+1 {
		return 6 + mine
	}
	return mine
}

func part1(input []string) {
	score := 0

	for _, line := range input {
		split_line := strings.Split(line, " ")
		opponent := int(split_line[0][0]) - 64
		mine := int(split_line[1][0]) - 87
		score += playRockPaperScissors(mine, opponent)
	}
	fmt.Println("Part 1: ", score)
}

func part2(input []string) {
	score := 0

	for _, line := range input {
		split_line := strings.Split(line, " ")
		opponent := int(split_line[0][0]) - 64
		mine := int(split_line[1][0]) - 87

		if mine == 1 {
			mine += ((opponent + 1) % 3)
		} else if mine == 2 {
			mine = opponent
		} else if mine == 3 {
			mine = (opponent % 3) + 1
		}

		score += playRockPaperScissors(mine, opponent)
	}

	fmt.Println("Part 2: ", score)
}

func main() {
	fmt.Println("This is day 2!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n")

	part1(input)
	part2(input)
}
