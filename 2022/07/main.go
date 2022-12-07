package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func part1(fs map[string]int) (total_size int) {
	for _, value := range fs {
		if value < 100000 {
			total_size += value
		}
	}
	return total_size
}

func part2(fs map[string]int) int {
	min := 30000000
	needed := min - (70000000 - fs["/"])
	for _, value := range fs {
		if value > needed && value < min {
			min = value
		}
	}
	return min
}

func main() {
	fmt.Println("This is day 7!")

	file, _ := os.Open("input.txt")
	sc := bufio.NewScanner(file)

	fs := make(map[string]int)
	var current_dir string
	for sc.Scan() {
		line := strings.Split(sc.Text(), " ")
		if line[0] == "$" {
			if line[1] == "cd" {
				current_dir = filepath.Join(current_dir, line[2])
			}
		} else if line[0] != "dir" {
			size, _ := strconv.Atoi(line[0])
			key := current_dir
			for {
				fs[key] += size
				if key == filepath.Dir(key) {
					break
				}
				key = filepath.Dir(key)
			}
		}
	}
	fmt.Println("Part1:", part1(fs))
	fmt.Println("Part2:", part2(fs))
}
