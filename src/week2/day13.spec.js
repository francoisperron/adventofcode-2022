import { dailyInput } from '../dailyInput.js'
import { isPairInOrder, pairInOrderPart1, pairInOrderPart2, parseDistressSignals } from './day13.js'

describe('Day 13: Distress Signal', () => {
  const example = '[1,1,3,1,1]\n[1,1,5,1,1]\n\n[[1],[2,3,4]]\n[[1],4]\n\n[9]\n[[8,7,6]]\n\n[[4,4],4,4]\n[[4,4],4,4,4]\n\n[7,7,7,7]\n[7,7,7]\n\n[]\n[3]\n\n[[[]]]\n[[]]\n\n[1,[2,[3,[4,[5,6,7]]]],8,9]\n[1,[2,[3,[4,[5,6,0]]]],8,9]'

  let input
  beforeEach(async () => input = await dailyInput(13))

  describe('Part 1; Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?', () => {
    it('parses distress signals into pairs of packets', () => {
      const signals = parseDistressSignals(example)
      expect(signals.length).to.equal(8)
      expect(signals[0][0]).to.deep.equal([1, 1, 3, 1, 1])
      expect(signals[0][1]).to.deep.equal([1, 1, 5, 1, 1])
      expect(signals[7][0]).to.deep.equal([1, [2, [3, [4, [5, 6, 7]]]], 8, 9])
      expect(signals[7][1]).to.deep.equal([1, [2, [3, [4, [5, 6, 0]]]], 8, 9])
    })

    describe('packets are in the right order when', () => {
      it('the left value is lower than the right value', () => {
        expect(isPairInOrder([3, 5])).to.equal(true)
        expect(isPairInOrder([5, 3])).to.equal(false)
        expect(isPairInOrder([5, 5])).to.equal(undefined)

        expect(isPairInOrder([[1, 1, 3, 1, 1], [1, 1, 5, 1, 1]])).to.equal(true)
        expect(isPairInOrder([[1, 1, 5, 1, 1], [1, 1, 3, 1, 1]])).to.equal(false)
      })

      it('a value needs to be converted to an array', () => {
        expect(isPairInOrder([[[1], [2, 3, 4]], [[1], 4]])).to.equal(true)
        expect(isPairInOrder([[[1], 4], [[1], [2, 3, 4]]])).to.equal(false)

        expect(isPairInOrder([[9], [[8, 7, 6]]])).to.equal(false)
        expect(isPairInOrder([[[8, 7, 6]], [9]])).to.equal(true)
      })

      it('the left array ran out of items', () => {
        expect(isPairInOrder([[[4, 4], 4, 4], [[4, 4], 4, 4, 4]])).to.equal(true)
        expect(isPairInOrder([[[[]]], [[]]])).to.equal(false)
      })
    })

    it('solves example', () => {
      expect(pairInOrderPart1(example)).to.equal(13)
    })

    it('solves it', () => {
      expect(pairInOrderPart1(input)).to.equal(5720)
    })
  })

  describe('Part2: What is the decoder key for the distress signal?', () => {
    it('solves example', () => {
      expect(pairInOrderPart2(example)).to.equal(140)
    })

    it('solves it', () => {
      expect(pairInOrderPart2(input)).to.equal(23504)
    })
  })
})
