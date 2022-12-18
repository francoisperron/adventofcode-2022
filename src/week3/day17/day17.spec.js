import { dailyInput } from '../../dailyInput.js'
import { playTetris } from './day17.js'

describe('Day 17: Pyroclastic Flow', () => {
  const example = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
  let input
  beforeEach(async () => input = await dailyInput(17))

  describe('Part 1: How many units tall will the tower of rocks be after 2022 rocks have stopped falling?', () => {
    it('solves example', () => {
      expect(playTetris(example, 1)).to.equal(1)
      expect(playTetris(example, 2)).to.equal(4)
      expect(playTetris(example, 3)).to.equal(6)
      expect(playTetris(example, 4)).to.equal(7)
      expect(playTetris(example)).to.equal(3068)
    })

    it('solves it', () => {
      expect(playTetris(input)).to.equal(3135)
    })
  })

  // describe('Part 2: How tall will the tower be after 1000000000000 rocks have stopped?', () => {
  //   it('solves example', () => {
  //     expect(playTetris(example, 1_000_000_000_000)).to.equal(1_514_285_714_288)
  //   })
  // })
})
