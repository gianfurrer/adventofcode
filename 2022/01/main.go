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

func part1(input []string) {
	max := 0
	for _, bag := range input {
		items := strings.Split(bag, "\n")
		total := 0
		for _, item := range items {
			item, err := strconv.Atoi(item)
			check(err)
			total += item
		}
		if total > max {
			max = total
		}
	}
	fmt.Println("Part 1: ", max)
}

func part2(input []string) {
	var bags []int
	for _, bag := range input {
		items := strings.Split(bag, "\n")
		total := 0
		for _, item := range items {
			item, err := strconv.Atoi(item)
			check(err)
			total += item
		}
		bags = append(bags, total)
	}
	sort.Ints(bags)
	top := bags[len(bags)-3:]
	sum := 0
	for _, t := range top {
		sum += t
	}
	fmt.Println("Part 1: ", sum)
}

func main() {
	fmt.Println("This is day 1!")

	inputArr, err := os.ReadFile("input.txt")
	check(err)
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n\n")

	part1(input)
	part2(input)
}
