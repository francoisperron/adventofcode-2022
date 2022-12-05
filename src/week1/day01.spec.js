import { descending, sum } from '../array.js'
import { dailyInput } from '../dailyInput.js'

describe('Day 1: Calorie Counting', () => {
  const example = '1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000'
  let input

  beforeEach(async () => {
    input = await dailyInput(1)
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

const maxCalories = (input, elfCount = 1) => input
  .split('\n\n')
  .map(food => food.split('\n'))
  .map(food => food.map(item => parseInt(item)))
  .map(food => food.reduce(sum))
  .sort(descending)
  .slice(0, elfCount)
  .reduce(sum)
