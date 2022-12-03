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

func convertToScore(char rune) int {
	score := int(char) - 38
	if score > 58 {
		score -= 58
	}
	return score
}

func getFirstIntersection(input1 string, input2 string) rune {
	for _, char1 := range input1 {
		for _, char2 := range input2 {
			if char1 == char2 {
				return char1
			}
		}
	}
	return rune(0)
}

func getFirst3WayIntersection(input1 string, input2 string, input3 string) rune {
	for _, char1 := range input1 {
		for _, char2 := range input2 {
			for _, char3 := range input3 {
				if char1 == char2 && char1 == char3 {
					return char1
				}
			}
		}
	}
	return rune(0)
}

func part1(input []string) int {
	score := 0
	for _, rucksack := range input {
		compartment1 := rucksack[0 : len(rucksack)/2]
		compartment2 := rucksack[len(rucksack)/2:]
		score += convertToScore(getFirstIntersection(compartment1, compartment2))
	}
	return score
}

func part2(input []string) int {
	score := 0
	for i := 0; i < len(input); i += 3 {
		score += convertToScore(getFirst3WayIntersection(input[i], input[i+1], input[i+2]))
	}
	return score
}

func main() {
	fmt.Println("This is day 3!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n")

	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))

}
