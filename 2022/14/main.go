package main

import (
	"fmt"
	"image"
	"os"
	"strings"
)

func sign(digit int) int {
	if digit > 0 {
		return 1
	} else if digit < 0 {
		return -1
	}
	return 0
}

func fallFrom(point image.Point, gameMap map[image.Point]rune, lowestY int, hasFloor bool) (image.Point, bool) {
	_, used := gameMap[point]
	if used {
		return point, false
	}
	for ; !used && point.Y <= lowestY; _, used = gameMap[point] {
		point.Y++
	}
	if point.Y--; point.Y >= lowestY {
		return point, hasFloor
	}
	if left, leftExists := fallFrom(point.Add(image.Pt(-1, 1)), gameMap, lowestY, hasFloor); leftExists && left.Y > point.Y {
		return left, true
	} else if !leftExists && left.Y-1 > point.Y {
		return left, false
	} else if right, rightExists := fallFrom(point.Add(image.Pt(1, 1)), gameMap, lowestY, hasFloor); rightExists && right.Y > point.Y {
		return right, true
	} else if !rightExists && right.Y-1 > point.Y {
		return right, false
	}
	return point, true
}

func play(gameMap map[image.Point]rune, lowestY int, hasFloor bool) (count int) {
	var point image.Point
	for exists := true; exists; count++ {
		point, exists = fallFrom(image.Point{500, 0}, gameMap, lowestY+1, hasFloor)
		gameMap[point] = 'o'
	}
	return count
}

func main() {
	rawInput, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.TrimSpace(string(rawInput)), "\n")

	gameMap, lowestY := make(map[image.Point]rune), 0
	for _, line := range input {
		var prevP image.Point
		for i, points := range strings.Split(line, " -> ") {
			var x, y int
			fmt.Sscanf(points, "%d,%d", &x, &y)
			p := image.Point{x, y}
			gameMap[p] = '#'
			if i != 0 {
				for ; prevP.X != p.X || prevP.Y != p.Y; prevP = prevP.Add(image.Pt(sign(p.X-prevP.X), sign(p.Y-prevP.Y))) {
					gameMap[prevP] = '#'
				}
			}
			if prevP = p; prevP.Y > lowestY {
				lowestY = prevP.Y
			}
		}
	}
	part1 := play(gameMap, lowestY, false)
	fmt.Println("Part 1:", part1)
	fmt.Println("Part 2:", part1+play(gameMap, lowestY, true))
}
