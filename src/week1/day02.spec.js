import { sum } from '../array.js'
import { dailyInputLines } from '../dailyInput.js'
import { objectKeyByValue } from '../object.js'

describe('Day 02: Rock Paper Scissors', () => {
  const example = 'A Y\nB X\nC Z'.split('\n')
  let input
  beforeEach(async () => {
    input = await dailyInputLines(2)
  })

  describe('Part 1: What would your total score be if everything goes exactly according to your strategy guide?', () => {
    it('calculates score for a round', () => {
      expect(rockPaperScissorsRoundScore(hand.rock, hand.paper)).to.equal(8)
      expect(rockPaperScissorsRoundScore(hand.paper, hand.rock)).to.equal(1)
      expect(rockPaperScissorsRoundScore(hand.scissors, hand.scissors)).to.equal(6)
    })

    it('solves example', () => {
      expect(rockPaperScissorsScore(example)).to.equal(15)
    })

    it('solves it', () => {
      expect(rockPaperScissorsScore(input)).to.equal(15422)
    })
  })

  describe('Part 2: Following the Elf\'s instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?', () => {
    it('figures out my hand based on round\'s end', () => {
      expect(figureOutMyHand(hand.rock, round.draw)).to.equal(hand.rock)
      expect(figureOutMyHand(hand.paper, round.loose)).to.equal(hand.rock)
      expect(figureOutMyHand(hand.scissors, round.win)).to.equal(hand.rock)
    })

    it('solves example', () => {
      expect(rockPaperScissorsScore2(example)).to.equal(12)
    })

    it('solves it', () => {
      expect(rockPaperScissorsScore2(input)).to.equal(15442)
    })
  })
})

const hand = {
  rock: 'rock',
  paper: 'paper',
  scissors: 'scissors'
}

const handDefeatTable = {
  [hand.rock]: hand.scissors,
  [hand.scissors]: hand.paper,
  [hand.paper]: hand.rock
}

const round = {
  draw: 'draw',
  loose: 'loose',
  win: 'win'
}

const rockPaperScissorsScore2 = input => input
  .map(round => ({ opponentHand: parseOpponentHand(round.split(' ')[0]), myHand: figureOutMyHand(parseOpponentHand(round.split(' ')[0]), parseRoundEnd(round.split(' ')[1])) }))
  .map(round => rockPaperScissorsRoundScore(round.opponentHand, round.myHand))
  .reduce(sum, 0)

const rockPaperScissorsScore = input => input
  .map(round => ({ opponentHand: parseOpponentHand(round.split(' ')[0]), myHand: parseMyHand(round.split(' ')[1]) }))
  .map(round => rockPaperScissorsRoundScore(round.opponentHand, round.myHand))
  .reduce(sum, 0)

const parseOpponentHand = h => h === 'A' ? hand.rock : h === 'B' ? hand.paper : hand.scissors
const parseMyHand = h => h === 'X' ? hand.rock : h === 'Y' ? hand.paper : hand.scissors
const parseRoundEnd = r => r === 'X' ? round.loose : r === 'Y' ? round.draw : round.win

const figureOutMyHand = (opponentHand, roundEnd) => roundEnd === round.draw ? opponentHand
  : roundEnd === round.loose ? handDefeatTable[opponentHand] : objectKeyByValue(handDefeatTable, opponentHand)

const rockPaperScissorsRoundScore = (opponentHand, myHand) => myScore(myHand) + outcomeScore(opponentHand, myHand)
const myScore = (myHand) => myHand === hand.rock ? 1 : myHand === hand.paper ? 2 : 3
const outcomeScore = (opponentHand, myHand) => handDefeatTable[myHand] === opponentHand ? 6 : opponentHand === myHand ? 3 : 0
