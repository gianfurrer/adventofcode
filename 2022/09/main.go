package main

import (
	"fmt"
	"os"
	"strings"
)

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func sign(digit int) int {
	if digit > 0 {
		return 1
	} else if digit < 0 {
		return -1
	}
	return 0
}

type Coords struct {
	x, y int
}

func (c *Coords) add(other Coords) {
	c.x += other.x
	c.y += other.y
}

func (c *Coords) walkToHead(other Coords) {
	c.x += sign(other.x - c.x)
	c.y += sign(other.y - c.y)
}

func getDirection(direction string) Coords {
	switch direction {
	case "L":
		return Coords{-1, 0}
	case "R":
		return Coords{1, 0}
	case "U":
		return Coords{0, -1}
	case "D":
		return Coords{0, 1}
	}
	return Coords{0, 0}
}

func walkRope(rope []Coords, motions []string) int {
	visited := make(map[Coords]bool)
	visited[rope[0]] = true
	for _, motion := range motions {
		var direction string
		var moves int
		fmt.Sscanf(motion, "%s %d", &direction, &moves)

		dirCoords := getDirection(direction)
		for m := 0; m < moves; m++ {
			rope[0].add(dirCoords)
			for t := 1; t < len(rope); t++ {
				head, tail := &rope[t-1], &rope[t]
				for Abs(head.x-tail.x) > 1 || Abs(head.y-tail.y) > 1 {
					tail.walkToHead(*head)
				}
			}
			visited[rope[len(rope)-1]] = true
		}
	}
	return len(visited)
}

func main() {
	inputArr, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.Trim(string(inputArr), "\n"), "\n")
	fmt.Println("Part 1", walkRope(make([]Coords, 2), input))
	fmt.Println("Part 2", walkRope(make([]Coords, 10), input))
}
