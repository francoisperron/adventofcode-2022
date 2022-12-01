import { descending, sum } from '../array.js'
import { dailyInputLines } from '../dailyInput.js'

describe('Day 1: Calorie Counting', () => {
  const example = '1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000\n'.split('\n')
  let input

  beforeEach(async () => {
    input = await dailyInputLines(1)
    input.push('')
  })

  describe('Part 1: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?', () => {
    it('solves example', () => {
      expect(maxCalories(example)).to.equal(24000)
    })

    it('solves it', async () => {
      expect(maxCalories(input)).to.equal(70116)
    })
  })

  describe('Part 2: Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?', () => {
    it('solves example', () => {
      expect(maxCalories(example, 3)).to.equal(45000)
    })
    it('solves it', () => {
      expect(maxCalories(input, 3)).to.equal(206582)
    })
  })
})

const maxCalories = (input, elfCount = 1) => {
  let calories = []
  let current = 0

  for (const i of input) {
    if (i === '') {
      calories.push(current)
      current = 0
    } else {
      current += parseInt(i)
    }
  }

  return calories.sort(descending).slice(0, elfCount).reduce(sum, 0)
}
