import { dailyInputLines } from '../dailyInput.js'
import { moveHead, moveTail, positionVisitedByTail } from './day09.js'

describe('Day 9: Rope Bridge', () => {
  const example = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2']
  let input
  beforeEach(async () => input = await dailyInputLines(9))

  describe('Part 1: Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?', () => {
    it('moves head', () => {
      expect(moveHead['L']({ x: 0, y: 0 })).to.deep.equal({ x: -1, y: 0 })
      expect(moveHead['R']({ x: 0, y: 0 })).to.deep.equal({ x: 1, y: 0 })
      expect(moveHead['U']({ x: 0, y: 0 })).to.deep.equal({ x: 0, y: 1 })
      expect(moveHead['D']({ x: 0, y: 0 })).to.deep.equal({ x: 0, y: -1 })
    })

    it('does not moves tail when it is touching the head', () => {
      const headAround = [
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: 0 },
        { x: -1, y: -1 }
      ]

      for (const head in headAround) {
        let newTail = moveTail(head, { x: 0, y: 0, visited: new Set() })
        expect(newTail).to.deep.equal({ x: 0, y: 0, visited: new Set().add('0-0') })
      }
    })

    it('moves tail horizontally', () => {
      let newTail = moveTail({ x: 2, y: 0 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 1, y: 0, visited: new Set().add('1-0') })

      newTail = moveTail({ x: -2, y: 0 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: -1, y: 0, visited: new Set().add('-1-0') })
    })


    it('moves tail vertically', () => {
      let newTail = moveTail({ x: 0, y: 2 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 0, y: 1, visited: new Set().add('0-1') })

      newTail = moveTail({ x: 0, y: -2 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 0, y: -1, visited: new Set().add('0--1') })
    })

    it('moves tail diagonally', () => {
      let newTail = moveTail({ x: 2, y: 1 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 1, y: 1, visited: new Set().add('1-1') })

      newTail = moveTail({ x: -2, y: 1 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: -1, y: 1, visited: new Set().add('-1-1') })

      newTail = moveTail({ x: 1, y: 2 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 1, y: 1, visited: new Set().add('1-1') })

      newTail = moveTail({ x: 1, y: -2 }, { x: 0, y: 0, visited: new Set() })
      expect(newTail).to.deep.equal({ x: 1, y: -1, visited: new Set().add('1--1') })
    })

    it('solves example', () => {
      expect(positionVisitedByTail(example)).to.equal(13)
    })

    it('solves it', () => {
      expect(positionVisitedByTail(input)).to.equal(6212)
    })
  })

  describe('Part 2: Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?', () => {
    it('solves example', () => {
      expect(positionVisitedByTail(example, 10)).to.equal(1)
    })

    it('solves it', () => {
      expect(positionVisitedByTail(input, 10)).to.equal(2522)
    })
  })
})
