import { monkeyBusinessPart1, monkeyBusinessPart2, monkeyTurn } from './day11.js'

describe('Day 11: Monkey in the Middle', () => {

  let monkeys
  let myMonkeys
  beforeEach(() => {
    monkeys = [
      { items: [79, 98], op: level => level * 19, test: level => level % 23 ? 3 : 2, inspections: 0 },
      { items: [54, 65, 75, 74], op: level => level + 6, test: level => level % 19 ? 0 : 2, inspections: 0 },
      { items: [79, 60, 97], op: level => level * level, test: level => level % 13 ? 3 : 1, inspections: 0 },
      { items: [74], op: level => level + 3, test: level => level % 17 ? 1 : 0, inspections: 0 }
    ]
    myMonkeys = [
      { items: [85, 77, 77], op: level => level * 7, test: level => level % 19 ? 7 : 6, inspections: 0 },
      { items: [80, 99], op: level => level * 11, test: level => level % 3 ? 5 : 3, inspections: 0 },
      { items: [74, 60, 74, 63, 86, 92, 80], op: level => level + 8, test: level => level % 13 ? 6 : 0, inspections: 0 },
      { items: [71, 58, 93, 65, 80, 68, 54, 71], op: level => level + 7, test: level => level % 7 ? 4 : 2, inspections: 0 },
      { items: [97, 56, 79, 65, 58], op: level => level + 5, test: level => level % 5 ? 0 : 2, inspections: 0 },
      { items: [77], op: level => level + 4, test: level => level % 11 ? 3 : 4, inspections: 0 },
      { items: [99, 90, 84, 50], op: level => level * level, test: level => level % 17 ? 1 : 7, inspections: 0 },
      { items: [50, 66, 61, 92, 64, 78], op: level => level + 3, test: level => level % 2 ? 1 : 5, inspections: 0 }
    ]
  })

  describe('Part 1: What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?', () => {
    it('turn monkeys example', () => {
      monkeyTurn(0, monkeys, (level) => Math.trunc(level / 3))
      expect(monkeys[0].inspections).to.equal(2)
      expect(monkeys[3].items).to.deep.equal([74, 500, 620])

      monkeyTurn(1, monkeys, (level) => Math.trunc(level / 3))
      expect(monkeys[1].inspections).to.equal(4)
      expect(monkeys[0].items).to.deep.equal([20, 23, 27, 26])
    })

    it('solves example', () => {
      expect(monkeyBusinessPart1(monkeys)).to.equal(10605)
    })

    it('solves it', () => {
      expect(monkeyBusinessPart1(myMonkeys)).to.equal(54752)
    })
  })

  describe('Part 2: what is the level of monkey business after 10000 rounds?', () => {
    it('solve example', () => {
      expect(monkeyBusinessPart2(monkeys, [23, 19, 13, 17])).to.equal(2713310158)
    })
    it('solve it', () => {
      expect(monkeyBusinessPart2(myMonkeys, [19, 3, 13, 7, 5, 11, 17, 2])).to.equal(13606755504)
    })
  })
})
