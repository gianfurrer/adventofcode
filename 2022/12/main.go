package main

import (
	"fmt"
	"os"
	"strings"
)

type Location struct {
	x         int
	y         int
	height    int
	neighbors []int
}

func dijkstra_search(grid []Location, start, end int) int {
	queue := []int{start}
	cost_so_far := make(map[int]int)
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if end == current {
			break
		}
		for _, neighbor := range grid[current].neighbors {
			new_cost := cost_so_far[current] + 1
			cost, ok := cost_so_far[neighbor]
			if !ok || new_cost < cost {
				cost_so_far[neighbor] = new_cost
				queue = append(queue, neighbor)
			}
		}
	}
	return cost_so_far[end]
}

func part2(grid []Location, end int) (min int) {
	for i, location := range grid {
		if location.height == 2 {
			steps := dijkstra_search(grid, i, end)
			if min == 0 || (steps < min && steps > 0) {
				min = steps
			}
		}
	}
	return min + 1
}

func main() {
	rawInput, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.TrimSpace(string(rawInput)), "\n")
	colCount := len(input[0])

	var grid []Location
	var start, end int
	for rIndex, row := range input {
		for cIndex, c := range row {
			location := Location{rIndex, cIndex, int(c) - 96, []int{}}
			if c == 'S' {
				location.height = 1
				start = len(grid)
			} else if c == 'E' {
				location.height = 26
				end = len(grid)
			}
			grid = append(grid, location)
		}
	}
	addNeighbor := func(index int, neighbor int) {
		if neighbor > 0 && neighbor < len(grid) && grid[neighbor].height-grid[index].height <= 1 {
			grid[index].neighbors = append(grid[index].neighbors, neighbor)
		}
	}
	for i := range grid {
		addNeighbor(i, i+1)
		addNeighbor(i, i-1)
		addNeighbor(i, i+colCount)
		addNeighbor(i, i-colCount)
	}
	fmt.Println("Part 1:", dijkstra_search(grid, start, end))
	fmt.Println("Part 2:", part2(grid, end))

}
