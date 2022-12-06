package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type stack struct {
	elements []rune
}

func (s *stack) push(r []rune) {
	s.elements = append(s.elements, r...)
}

func (s *stack) pop(n int) (r []rune) {
	r = s.elements[len(s.elements)-n : len(s.elements)]
	s.elements = s.elements[:len(s.elements)-n]
	return
}

func (s *stack) addToBottom(r rune) {
	s.elements = append([]rune{r}, s.elements...)
}

func createStack(input string) (stacks []stack) {
	stackRows := strings.Split(input, "\n")
	amount := len(strings.Split(stackRows[len(stackRows)-1], "   "))
	stackRows = stackRows[1:]
	stacks = make([]stack, amount)

	for _, elem := range stackRows {
		for i := 0; i < amount; i++ {
			container := rune(elem[i*4+1])
			if container != ' ' {
				stacks[i].addToBottom(container)
			}
		}
	}
	return stacks
}

func parseMoves(input string) (moves [][]int) {
	movesStr := strings.Split(input, "\n")
	for _, line := range movesStr {
		var move []int
		split := strings.Split(line, " ")
		for i := 1; i < len(split); i += 2 {
			nr, err := strconv.Atoi(split[i])
			check(err)
			move = append(move, nr)
		}
		moves = append(moves, move)
	}
	return moves
}

func part1(input []string) (result string) {
	stacks := createStack(input[0])
	moves := parseMoves(input[1])

	for _, move := range moves {
		for i := 0; i < move[0]; i++ {
			stacks[move[2]-1].push(stacks[move[1]-1].pop(1))
		}
	}

	for _, stack := range stacks {
		result += string(stack.pop(1))
	}

	return result
}

func part2(input []string) (result string) {
	stacks := createStack(input[0])
	moves := parseMoves(input[1])

	for _, move := range moves {
		stacks[move[2]-1].push(stacks[move[1]-1].pop(move[0]))
	}

	for _, stack := range stacks {
		result += string(stack.pop(1))
	}

	return result
}

func main() {
	fmt.Println("This is day 4!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n\n")

	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))
}
