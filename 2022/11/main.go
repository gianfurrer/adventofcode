package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Monkey struct {
	items     chan int
	operation func(nr int) int
	test      func(nr int) int
}

func play(rounds int, monkeys []Monkey, op func(int) int) int {
	monkeys = append([]Monkey{}, monkeys...)
	inspected := make([]int, len(monkeys))
	for r := 0; r < rounds; r++ {
		for i, monkey := range monkeys {
			for len(monkey.items) > 0 {
				inspected[i]++
				item := int(op(monkey.operation(<-monkey.items)))
				monkeys[monkey.test(item)].items <- item
			}
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(inspected)))
	return inspected[0] * inspected[1]
}

func main() {
	file, _ := os.Open("input.txt")
	sc := bufio.NewScanner(file)

	var monkeys []Monkey
	lcm := 1
	for sc.Scan() {
		sc.Scan() // Monkey Nr
		var op string
		var divisibleBy, ifTrue, ifFalse, opNr int
		m := Monkey{items: make(chan int, 50)}

		for _, item := range strings.Split(sc.Text()[18:], ", ") {
			nr, _ := strconv.Atoi(item)
			m.items <- nr
		}

		sc.Scan()
		fmt.Sscanf(strings.ReplaceAll(sc.Text(), "* old", "^ 2"), "  Operation: new = old %s %d", &op, &opNr)
		m.operation = map[string]func(int) int{
			"+": func(nr int) int { return nr + opNr },
			"*": func(nr int) int { return nr * opNr },
			"^": func(nr int) int { return nr * nr },
		}[op]

		sc.Scan()
		fmt.Sscanf(sc.Text(), "  Test: divisible by %d", &divisibleBy)
		sc.Scan()
		fmt.Sscanf(sc.Text(), "    If true: throw to monkey %d", &ifTrue)
		sc.Scan()
		fmt.Sscanf(sc.Text(), "    If false: throw to monkey %d", &ifFalse)
		sc.Scan()

		m.test = func(nr int) int {
			if nr%divisibleBy == 0 {
				return ifTrue
			} else {
				return ifFalse
			}
		}

		monkeys = append(monkeys, m)
		lcm *= divisibleBy
	}

	fmt.Println("Part 1:", play(20, monkeys, func(i int) int { return i / 3 }))
	fmt.Println("Part 2:", play(10000, monkeys, func(i int) int { return i % lcm }))
}
