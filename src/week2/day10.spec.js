import { dailyInputLines } from '../dailyInput.js'
import { clockCircuitPart1, renderImagePart2, xValueAt } from './day10.js'

describe('Day 10: Cathode-Ray Tube', () => {
  const example = ['addx 15', 'addx -11', 'addx 6', 'addx -3', 'addx 5', 'addx -1', 'addx -8', 'addx 13', 'addx 4', 'noop', 'addx -1', 'addx 5', 'addx -1', 'addx 5', 'addx -1', 'addx 5', 'addx -1', 'addx 5', 'addx -1', 'addx -35', 'addx 1', 'addx 24', 'addx -19', 'addx 1', 'addx 16', 'addx -11', 'noop', 'noop', 'addx 21', 'addx -15', 'noop', 'noop', 'addx -3', 'addx 9', 'addx 1', 'addx -3', 'addx 8', 'addx 1', 'addx 5', 'noop', 'noop', 'noop', 'noop', 'noop', 'addx -36', 'noop', 'addx 1', 'addx 7', 'noop', 'noop', 'noop', 'addx 2', 'addx 6', 'noop', 'noop', 'noop', 'noop', 'noop', 'addx 1', 'noop', 'noop', 'addx 7', 'addx 1', 'noop', 'addx -13', 'addx 13', 'addx 7', 'noop', 'addx 1', 'addx -33', 'noop', 'noop', 'noop', 'addx 2', 'noop', 'noop', 'noop', 'addx 8', 'noop', 'addx -1', 'addx 2', 'addx 1', 'noop', 'addx 17', 'addx -9', 'addx 1', 'addx 1', 'addx -3', 'addx 11', 'noop', 'noop', 'addx 1', 'noop', 'addx 1', 'noop', 'noop', 'addx -13', 'addx -19', 'addx 1', 'addx 3', 'addx 26', 'addx -30', 'addx 12', 'addx -1', 'addx 3', 'addx 1', 'noop', 'noop', 'noop', 'addx -9', 'addx 18', 'addx 1', 'addx 2', 'noop', 'noop', 'addx 9', 'noop', 'noop', 'noop', 'addx -1', 'addx 2', 'addx -37', 'addx 1', 'addx 3', 'noop', 'addx 15', 'addx -21', 'addx 22', 'addx -6', 'addx 1', 'noop', 'addx 2', 'addx 1', 'noop', 'addx -10', 'noop', 'noop', 'addx 20', 'addx 1', 'addx 2', 'addx 2', 'addx -6', 'addx -11', 'noop', 'noop', 'noop']
  let input
  beforeEach(async () => input = await dailyInputLines(10))

  describe('Part 1: Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?', () => {
    it('computes x value at given cycle for small example', () => {
      const small = ['noop', 'addx 3', 'addx -5', 'noop', 'noop']

      expect(xValueAt(1, small)).to.equal(1)
      expect(xValueAt(2, small)).to.equal(1)
      expect(xValueAt(3, small)).to.equal(1)
      expect(xValueAt(4, small)).to.equal(4)
      expect(xValueAt(5, small)).to.equal(4)
      expect(xValueAt(6, small)).to.equal(-1)
    })

    it('computes x value at given cycle for small example', () => {
      expect(xValueAt(20, example)).to.equal(21)
      expect(xValueAt(60, example)).to.equal(19)
      expect(xValueAt(100, example)).to.equal(18)
      expect(xValueAt(140, example)).to.equal(21)
      expect(xValueAt(180, example)).to.equal(16)
      expect(xValueAt(220, example)).to.equal(18)
    })

    it('solves example', () => {
      expect(clockCircuitPart1(example)).to.equal(13140)
    })

    it('solves it', () => {
      expect(clockCircuitPart1(input)).to.equal(13520)
    })
  })

  describe('Part 2: Render the image given by your program. What eight capital letters appear on your CRT?', () => {
    it('solves example', () => {
      const expectedCRT =
        '##..##..##..##..##..##..##..##..##..##..\n' +
        '###...###...###...###...###...###...###.\n' +
        '####....####....####....####....####....\n' +
        '#####.....#####.....#####.....#####.....\n' +
        '######......######......######......####\n' +
        '#######.......#######.......#######.....'

      expect(renderImagePart2(example)).to.equal(expectedCRT)
    })

    it('solves it', () => {
      // PGPHBEAB
      const expectedCRT =
        '###...##..###..#..#.###..####..##..###..\n' +
        '#..#.#..#.#..#.#..#.#..#.#....#..#.#..#.\n' +
        '#..#.#....#..#.####.###..###..#..#.###..\n' +
        '###..#.##.###..#..#.#..#.#....####.#..#.\n' +
        '#....#..#.#....#..#.#..#.#....#..#.#..#.\n' +
        '#.....###.#....#..#.###..####.#..#.###..'

      expect(renderImagePart2(input)).to.equal(expectedCRT)
    })
  })
})
