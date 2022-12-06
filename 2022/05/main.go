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

type Stack []string

// IsEmpty: check if stack is empty
func (s *Stack) IsEmpty() bool {
	return len(*s) == 0
}

// Push a new value onto the stack
func (s *Stack) Push(str string) {
	*s = append(*s, str) // Simply append the new value to the end of the stack
}

// Push a new value onto the stack
func (s *Stack) PushN(elements []string) {
	for _, element := range elements {
		*s = append(*s, element) // Simply append the new value to the end of the stack
	}
}

// Remove and return top element of stack. Return false if stack is empty.
func (s *Stack) Pop() string {
	if s.IsEmpty() {
		return ""
	} else {
		index := len(*s) - 1   // Get the index of the top most element.
		element := (*s)[index] // Index into the slice and obtain the element.
		*s = (*s)[:index]      // Remove it from the stack by slicing it off.
		return element
	}
}

// Remove and return top element of stack. Return false if stack is empty.
func (s *Stack) PopN(n int) []string {
	if s.IsEmpty() {
		return []string{}
	} else {
		index := len(*s) - n     // Get the index of the top most element.
		elements := (*s)[index:] // Index into the slice and obtain the element.
		*s = (*s)[:index]        // Remove it from the stack by slicing it off.
		return elements
	}
}

func createStack(input string) []Stack {
	stackRows := strings.Split(input, "\n")
	amount := len(strings.Split(stackRows[len(stackRows)-1], "   "))
	stackRows = stackRows[:len(stackRows)-1]
	for i, j := 0, len(stackRows)-1; i < j; i, j = i+1, j-1 {
		stackRows[i], stackRows[j] = stackRows[j], stackRows[i]
	}

	var stacks []Stack

	for stackIndex, elem := range stackRows {
		for i := 0; i < amount; i++ {
			if stackIndex == 0 {
				var stack Stack
				stacks = append(stacks, stack)
			}
			container := strings.Trim(elem[i*4:i*4+3], " ")
			container = strings.TrimLeft(container, "[")
			container = strings.TrimRight(container, "]")
			if len(container) > 0 {
				stacks[i].Push(container)
			}
		}
	}
	return stacks
}

func parseMoves(input string) [][]int {
	movesStr := strings.Split(input, "\n")
	var moves [][]int
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

func part1(input []string) string {
	stacks := createStack(input[0])
	moves := parseMoves(input[1])

	for _, move := range moves {
		for i := 0; i < move[0]; i++ {
			elemToMove := stacks[move[1]-1].Pop()
			stacks[move[2]-1].Push(elemToMove)
		}
	}

	var result string
	for _, stack := range stacks {
		result += stack.Pop()
	}

	return result
}

func part2(input []string) string {
	stacks := createStack(input[0])
	moves := parseMoves(input[1])

	for _, move := range moves {
		elementsToMove := stacks[move[1]-1].PopN(move[0])
		stacks[move[2]-1].PushN(elementsToMove)
	}

	var result string
	for _, stack := range stacks {
		result += stack.Pop()
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
