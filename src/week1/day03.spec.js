import { sum } from '../array.js'
import { dailyInputLines } from '../dailyInput.js'

describe('Day 3: Rucksack Reorganization', () => {
  const example = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw'
  ]

  let input
  beforeEach(async () => {
    input = await dailyInputLines(3)
  })

  describe('Part 1: Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?', () => {
    it('finds misplaced item', () => {
      expect(misplacedItemIn(example[0])).to.equal('p')
      expect(misplacedItemIn(example[1])).to.equal('L')
      expect(misplacedItemIn(example[2])).to.equal('P')
      expect(misplacedItemIn(example[3])).to.equal('v')
      expect(misplacedItemIn(example[4])).to.equal('t')
      expect(misplacedItemIn(example[5])).to.equal('s')
    })

    it('converts item to rearrangement priority', () => {
      expect(priorityOf('p')).to.equal(16)
      expect(priorityOf('L')).to.equal(38)
      expect(priorityOf('P')).to.equal(42)
      expect(priorityOf('v')).to.equal(22)
      expect(priorityOf('t')).to.equal(20)
      expect(priorityOf('s')).to.equal(19)
    })

    it('solves example', () => {
      expect(prioritiesOfMisplacedItems(example)).to.equal(157)
    })

    it('solves it', () => {
      expect(prioritiesOfMisplacedItems(input)).to.equal(8515)
    })
  })

  describe('Part 2: Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?', () => {
    it('groups rucksacks by 3', () => {
      expect(groupBy3(example)).to.deep.equal([
        ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'],
        ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw']
      ])
    })

    it('finds common items in group', () => {
      expect(commonItemIn(['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'])).to.equal('r')
      expect(commonItemIn(['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'])).to.equal('Z')
    })

    it('solves example', () => {
      expect(prioritiesOfBadges(example)).to.equal(70)
    })

    it('solves it', () => {
      expect(prioritiesOfBadges(input)).to.equal(2434)
    })
  })
})

// part 1
const prioritiesOfMisplacedItems = input => input
  .map(rucksack => misplacedItemIn(rucksack))
  .map(item => priorityOf(item))
  .reduce(sum, 0)

const misplacedItemIn = rucksack => {
  const compartment1 = rucksack.slice(0, rucksack.length / 2).split('')
  const compartment2 = rucksack.slice(rucksack.length / 2).split('')
  return compartment1.filter(item => compartment2.includes(item)).pop()
}

const priorityOf = item => item === item.toLocaleLowerCase()
  ? item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
  : item.charCodeAt(0) - 'A'.charCodeAt(0) + 27

// part 2
const prioritiesOfBadges = input => groupBy3(input)
  .map(group => commonItemIn(group))
  .map(item => priorityOf(item))
  .reduce(sum, 0)

const commonItemIn = group => group
  .map(rucksack => rucksack.split(''))
  .reduce((a, b) => a.filter(c => b.includes(c)))
  .pop()

const groupBy3 = input => input
  .reduce((groups, rucksack, index) => (index % 3 ? groups[groups.length - 1].push(rucksack) : groups.push([rucksack])) && groups, [])

