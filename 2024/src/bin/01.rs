advent_of_code::solution!(1);

fn parse_input(input: &str) -> Vec<(u32, u32)> {
    input
        .trim()
        .split("\n")
        .map(|line| {
            let parts = line.split("   ").collect::<Vec<&str>>();
            (
                parts[0].parse::<u32>().unwrap(),
                parts[1].parse::<u32>().unwrap(),
            )
        })
        .collect()
}

pub fn part_one(input: &str) -> Option<u32> {
    let vectors = parse_input(input);
    let mut vec1 = vectors.iter().map(|(x, _)| *x).collect::<Vec<u32>>();
    let mut vec2 = vectors.iter().map(|(_, y)| *y).collect::<Vec<u32>>();
    vec1.sort();
    vec2.sort();

    let mut distance: u32 = 0;
    for (i, j) in vec1.iter().zip(vec2.iter()) {
        distance += i.abs_diff(*j);
    }

    Some(distance)
}

pub fn part_two(input: &str) -> Option<u32> {
    let vectors = parse_input(input);
    let vec1 = vectors.iter().map(|(x, _)| *x).collect::<Vec<u32>>();
    let vec2 = vectors.iter().map(|(_, y)| *y).collect::<Vec<u32>>();
    let mut distance: u32 = 0;
    for n in vec1.iter() {
        let count = vec2.iter().filter(|&x| *x == *n).count();
        distance += n * count as u32;
    }
    Some(distance)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let result = part_one(&advent_of_code::template::read_file("examples", DAY));
        assert_eq!(result, Some(11));
    }

    #[test]
    fn test_part_two() {
        let result = part_two(&advent_of_code::template::read_file("examples", DAY));
        assert_eq!(result, Some(31));
    }
}
