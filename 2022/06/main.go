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

func solve(input string, match_count int) int {
	for index, first_char := range input {
		marker := string(first_char)
		for i := 1; i < match_count; i++ {
			next_char := string(input[index+i])
			if strings.Contains(marker, next_char) {
				break
			}
			marker += next_char
		}
		if len(marker) == match_count {
			return index + match_count
		}
	}
	return -1
}

func main() {
	fmt.Println("This is day 4!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Trim(string(inputArr), "\n")

	fmt.Println("Part 1:", solve(input, 4))
	fmt.Println("Part 2:", solve(input, 14))
}
