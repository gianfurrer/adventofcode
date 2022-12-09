package main

import (
	"fmt"
	"os"
	"strings"
)

func part1(myMap [][]int) (visible int) {
	visible = len(myMap)*2 + len(myMap[0])*2 - 4
	for r := 1; r < len(myMap)-1; r++ {
		row := myMap[r]
		for c := 1; c < len(row)-1; c++ {
			tree := row[c]
			isVisible := true
			for cl := c - 1; cl >= 0; cl-- {
				if tree <= row[cl] {
					isVisible = false
					break
				}
			}
			if isVisible {
				visible++
				continue
			}
			isVisible = true
			for ch := c + 1; ch < len(row); ch++ {
				if tree <= row[ch] {
					isVisible = false
					break
				}
			}
			if isVisible {
				visible++
				continue
			}
			isVisible = true
			for rh := r - 1; rh >= 0; rh-- {
				if tree <= myMap[rh][c] {
					isVisible = false
					break
				}
			}
			if isVisible {
				visible++
				continue
			}
			isVisible = true
			for rl := r + 1; rl < len(myMap); rl++ {
				if tree <= myMap[rl][c] {
					isVisible = false
					break
				}
			}
			if isVisible {
				visible++
				continue
			}
		}
	}
	return visible
}

func part2(myMap [][]int) (max int) {
	for r := 1; r < len(myMap)-1; r++ {
		row := myMap[r]
		for c := 1; c < len(row)-1; c++ {
			tree := row[c]
			score := 1
			for cl := c - 1; cl >= 0; cl-- {
				if tree <= row[cl] || cl == 0 {
					score *= c - cl
					break
				}
			}
			for ch := c + 1; ch < len(row); ch++ {
				if tree <= row[ch] || ch == len(row)-1 {
					score *= ch - c
					break
				}
			}
			for rh := r - 1; rh >= 0; rh-- {
				if tree <= myMap[rh][c] || rh == 0 {
					score *= r - rh
					break
				}
			}
			for rl := r + 1; rl < len(myMap); rl++ {
				if tree <= myMap[rl][c] || rl == len(myMap)-1 {
					score *= rl - r
					break
				}
			}
			if score > max {
				max = score
			}
		}
	}
	return max
}

func main() {
	fmt.Println("This is day 8!")

	inputArr, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n")

	var myMap [][]int
	for _, line := range input {
		var nrs []int
		for _, nrStr := range line {
			nrs = append(nrs, int(nrStr)-48)
		}
		myMap = append(myMap, nrs)
	}

	fmt.Println("Part1:", part1(myMap))
	fmt.Println("Part2:", part2(myMap))
}
