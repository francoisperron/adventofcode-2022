import { dailyInputLines } from '../dailyInput.js'

describe('Day 4: Camp Cleanup', () => {
  const example = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8']
  let input
  beforeEach(async () => {
    input = await dailyInputLines(4)
  })

  describe('Part 1: In how many assignment pairs does one range fully contain the other?', () => {
    it('determines when a pair fully contains another', () => {
      expect(pairsFullyContained(['8-17,16-49'])).to.equal(0)
      expect(pairsFullyContained(['2-8,3-7'])).to.equal(1)
      expect(pairsFullyContained(['6-6,4-6'])).to.equal(1)
    })
    it('solves example', () => {
      expect(pairsFullyContained(example)).to.equal(2)
    })
    it('solves it', () => {
      expect(pairsFullyContained(input)).to.equal(413)
    })
  })

  describe('Part 2: In how many assignment pairs do the ranges overlap?', () => {
    it('determines when a pair overlaps', () => {
      expect(pairsOverlapping(['2-4,6-8'])).to.equal(0)
      expect(pairsOverlapping(['8-17,16-49'])).to.equal(1)
      expect(pairsOverlapping(['2-8,3-7'])).to.equal(1)
      expect(pairsOverlapping(['6-6,4-6'])).to.equal(1)
    })
    it('solves example', () => {
      expect(pairsOverlapping(example)).to.equal(4)
    })
    it('solves it', () => {
      expect(pairsOverlapping(input)).to.equal(806)
    })
  })
})

const pairsOverlapping = pairs => pairs
  .map(parsePair)
  .filter(pairOverlapping)
  .length

const pairsFullyContained = pairs => pairs
  .map(parsePair)
  .filter(pairFullyContained)
  .length

const parsePair = pair => ({
  minElf1: parseInt(pair.split(',')[0].split('-')[0]),
  maxElf1: parseInt(pair.split(',')[0].split('-')[1]),
  minElf2: parseInt(pair.split(',')[1].split('-')[0]),
  maxElf2: parseInt(pair.split(',')[1].split('-')[1])
})

const pairFullyContained = p =>
  (p.minElf2 <= p.minElf1 && p.maxElf2 >= p.maxElf1) ||
  (p.minElf1 <= p.minElf2 && p.maxElf1 >= p.maxElf2)

const pairOverlapping = p =>
  (p.maxElf1 >= p.minElf2 && p.minElf1 <= p.maxElf2) ||
  (p.maxElf2 >= p.minElf1 && p.minElf2 <= p.maxElf1)
