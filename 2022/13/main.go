package main

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"
	"sort"
	"strings"
)

func compareLists(left, right []any) int {
	for i := 0; i < len(left); i++ {
		if i >= len(right) {
			return -1
		}
		isLeftSlice, isRightSlice := reflect.TypeOf(left[i]).Kind() == reflect.Slice, reflect.TypeOf(right[i]).Kind() == reflect.Slice
		if isLeftSlice || isRightSlice {
			if !isLeftSlice {
				left[i] = []any{left[i].(float64)}
			} else if !isRightSlice {
				right[i] = []any{right[i].(float64)}
			}
			if res := compareLists(left[i].([]any), right[i].([]any)); res != 0 {
				return res
			}
		} else if leftNr, rightNr := left[i].(float64), right[i].(float64); leftNr < rightNr {
			return 1
		} else if leftNr > rightNr {
			return -1
		}
	}
	if len(right) > len(left) {
		return 1
	}
	return 0
}

func part2(lists [][]any) int {
	divider1 := []any{[]any{float64(2)}}
	divider2 := []any{[]any{float64(6)}}
	lists = append(lists, divider1, divider2)
	sort.Slice(lists, func(i, j int) bool {
		return compareLists(lists[i], lists[j]) > 0
	})
	score := 1
	for i, list := range lists {
		if compareLists(list, divider1) == 0 || compareLists(list, divider2) == 0 {
			score *= (i + 1)
		}
	}
	return score
}

func main() {
	rawInput, _ := os.ReadFile("input.txt")
	input := strings.Split(strings.TrimSpace(string(rawInput)), "\n\n")

	lists := make([][]any, len(input)*2)
	count := 0
	for i, line := range input {
		split, index := strings.Split(line, "\n"), i*2
		json.Unmarshal([]byte(split[0]), &lists[index])
		json.Unmarshal([]byte(split[1]), &lists[index+1])
		if compareLists(lists[index], lists[index+1]) > 0 {
			count += i + 1
		}
	}
	fmt.Println("Part 1:", count)
	fmt.Println("Part 2:", part2(lists))
}
