import { dailyInput } from '../dailyInput.js'
import { adjacentsTo, fewestStepsPart1, fewestStepsPart2, parseHeightmap } from './day12.js'

describe('Day 12: Hill Climbing Algorithm', () => {
  const example =
    'Sabqponm\n' +
    'abcryxxl\n' +
    'accszExk\n' +
    'acctuvwj\n' +
    'abdefghi'

  let input
  beforeEach(async () => input = await dailyInput(12))

  describe('Part 1: What is the fewest steps required to move from your current position to the location that should get the best signal?', () => {
    let start, end, map
    beforeEach(() => {
      ({ start, end, map } = parseHeightmap(example))
    })

    it('parses each points', () => {
      expect(map.length).to.equal(40)
      expect(map[39]).to.deep.equal({ x: 7, y: 4, height: 'i'.charCodeAt(0), distance: 0 })
    })

    it('finds starting point', () => {
      expect(start).to.deep.equal({ x: 0, y: 0, height: 'a'.charCodeAt(0), distance: 0 })
    })

    it('finds end point', () => {
      expect(end).to.deep.equal({ x: 5, y: 2, height: 'z'.charCodeAt(0), distance: 0 })
    })

    it('finds climbing adjacent points to start', () => {
      const adjacentsToStart = adjacentsTo(start, map)
      expect(adjacentsToStart.length).to.equal(2)
      expect(adjacentsToStart[0]).to.deep.equal({ x: 1, y: 0, height: 'a'.charCodeAt(0), distance: 0 })
      expect(adjacentsToStart[1]).to.deep.equal({ x: 0, y: 1, height: 'a'.charCodeAt(0), distance: 0 })
    })

    it('finds climbing adjacent points to end', () => {
      const adjacentsToEnd = adjacentsTo(end, map)
      expect(adjacentsToEnd.length).to.equal(1)
      expect(adjacentsToEnd[0]).to.deep.equal({ x: 4, y: 2, height: 'z'.charCodeAt(0), distance: 0 })
    })

    it('does not climb a point already visited', () => {
      map.find(p => p.x === 4 && p.y === 2).distance = 1

      const adjacentsToEnd = adjacentsTo(end, map)
      expect(adjacentsToEnd.length).to.equal(0)
    })

    it('solves example', () => {
      expect(fewestStepsPart1(example)).to.equal(31)
    })

    it('solves it', () => {
      expect(fewestStepsPart1(input)).to.equal(383)
    })
  })

  describe('Part 2: What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal?', () => {
    it('solves example', () => {
      expect(fewestStepsPart2(example)).to.equal(29)
    })

    it('solves it', () => {
      expect(fewestStepsPart2(input)).to.equal(377)
    })
  })
})


