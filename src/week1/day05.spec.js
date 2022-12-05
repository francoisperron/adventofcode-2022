import { dailyInput } from '../dailyInput.js'

describe('Day 5: Supply Stacks', () => {
  const example =
    '    [D]    \n' +
    '[N] [C]    \n' +
    '[Z] [M] [P]\n' +
    ' 1   2   3 \n' +
    '\n' +
    'move 1 from 2 to 1\n' +
    'move 3 from 1 to 3\n' +
    'move 2 from 2 to 1\n' +
    'move 1 from 1 to 2'

  let input
  beforeEach(async () => {
    input = await dailyInput(5)
  })

  describe('Part 1: After the rearrangement procedure completes, what crate ends up on top of each stack?', () => {
    it('parses crates in stacks', () => {
      expect(parseStacks(example)).to.deep.equal([['N', 'Z'], ['D', 'C', 'M'], ['P']])
    })

    it('parses moves in stacks', () => {
      expect(parseMoves(example)).to.deep.equal([
        { origin: 2, destination: 1, nbCrates: 1 },
        { origin: 1, destination: 3, nbCrates: 3 },
        { origin: 2, destination: 1, nbCrates: 2 },
        { origin: 1, destination: 2, nbCrates: 1 }
      ])
    })

    it('solves example', () => {
      expect(cratesOnTop(example)).to.equal('CMZ')
    })

    it('solves it', () => {
      expect(cratesOnTop(input)).to.equal('FZCMJCRHZ')
    })
  })

  describe('Part 2: After the rearrangement procedure completes, what crate ends up on top of each stack?', () => {
    it('solves example', () => {
      expect(cratesOnTopPart2(example)).to.equal('MCD')
    })

    it('solves it', () => {
      expect(cratesOnTopPart2(input)).to.equal('JSDHQMZGF')
    })
  })
})

const cratesOnTopPart2 = input => {
  const stacks = parseStacks(input)
  const moves = parseMoves(input)

  for (const move of moves) {
    const crates = stacks[move.origin - 1].splice(0, move.nbCrates)
    stacks[move.destination - 1].unshift(...crates)
  }

  return stacks.map(s => s.shift()).join('')
}

const cratesOnTop = input => {
  const stacks = parseStacks(input)
  const moves = parseMoves(input)

  for (const move of moves) {
    for (let i = 0; i < move.nbCrates; i++) {
      const crate = stacks[move.origin - 1].shift()
      stacks[move.destination - 1].unshift(crate)
    }
  }

  return stacks.map(s => s.shift()).join('')
}

const parseStacks = input => {
  const stacks = input
    .split('\n\n')[0]
    .split('\n')
    .filter(line => line.includes('['))
    .map(line => {
      let clean = ''
      let chars = line.split('')
      for (let i = 1; i < chars.length; i = i + 4) {
        clean += chars[i]
      }
      return clean.split('')
    })
  return stacks[0].map((_, colIndex) => stacks.map(row => row[colIndex])).map(stack => stack.filter(crate => crate !== ' '))
}

const parseMoves = input => {
  return input
    .split('\n\n')[1]
    .split('\n')
    .map(line => line.split(' '))
    .map(line => ({ origin: parseInt(line[3]), destination: parseInt(line[5]), nbCrates: parseInt(line[1]) }))
}

