import { dailyInputLines } from '../dailyInput.js'
import { parseRocks, parseRock, simulateFallingSandPart1, simulateFallingSand, simulateFallingSandPart2 } from './day14.js'

describe('Day 14: Regolith Reservoir', () => {
  const example = ['498,4 -> 498,6 -> 496,6', '503,4 -> 502,4 -> 502,9 -> 494,9']
  let input
  beforeEach(async () => input = await dailyInputLines(14))

  describe('Part 1: Simulate the falling sand. How many units of sand come to rest before sand starts flowing into the abyss below?', () => {
    describe('parses', () => {
      it('one rock path', () => {
        expect(parseRock('498,4 -> 498,6 -> 496,6')).to.deep.equal(['498:4', '498:5', '498:6', '498:6', '497:6', '496:6'])
      })

      it('all paths', () => {
        const expectedCave = ['498:4', '498:5', '498:6', '498:6', '497:6', '496:6', '503:4', '502:4', '502:4', '502:5', '502:6', '502:7', '502:8', '502:9', '502:9', '501:9', '500:9', '499:9', '498:9', '497:9', '496:9', '495:9', '494:9']
        expect(parseRocks(example)).to.deep.equal(new Set(expectedCave))
      })
    })

    describe('when sand pours', () => {
      it('stops under x: 500, y: 0', () => {
        const cave = parseRocks(example)
        simulateFallingSand(cave, () => false, { x: 500, y: 0 })
        expect(cave.has('500:8')).to.equal(true)
      })

      it('then to the left', () => {
        const cave = parseRocks(example)
        cave.add('500:8')
        simulateFallingSand(cave, () => false, { x: 500, y: 0 })
        expect(cave.has('499:8')).to.equal(true)
      })

      it('then to the right', () => {
        const cave = parseRocks(example)
        cave.add('500:8')
        cave.add('499:8')
        simulateFallingSand(cave, () => false, { x: 500, y: 0 })
        expect(cave.has('501:8')).to.equal(true)
      })

      it('then recursive', () => {
        const cave = parseRocks(example)
        cave.add('500:8')
        cave.add('499:8')
        cave.add('501:8')
        cave.add('500:7')
        simulateFallingSand(cave, () => false, { x: 500, y: 0 })
        expect(cave.has('498:8')).to.equal(true)
      })
    })

    it('solves example', () => {
      expect(simulateFallingSandPart1(example)).to.equal(24)
    })

    it('solves it', () => {
      expect(simulateFallingSandPart1(input)).to.equal(897)
    })
  })

  describe('Part 2: Simulate the falling sand until the source of the sand becomes blocked. How many units of sand come to rest?', () => {
    it('solves example', () => {
      expect(simulateFallingSandPart2(example)).to.equal(93)
    })
    it('solves it', () => {
      expect(simulateFallingSandPart2(input)).to.equal(26683)
    })
  })
})





