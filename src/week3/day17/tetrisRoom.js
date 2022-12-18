import { jet } from './jetsPattern.js'
import { shiftRock } from './rocksPattern.js'

export const tetrisRoom = (initialRocks = floor) => {
  const rocks = {}
  let _highestRock = 0
  const newRock = (rock) => shiftRock(rock, [2, 4 + _highestRock])
  const highestRock = () => _highestRock

  const fallDown = rock => {
    const fellRockPosition = shiftRock(rock, [0, -1])
    const cannotFall = fellRockPosition.some(r => rocks[hash(r)])
    return cannotFall ? rock : fellRockPosition
  }

  const push = (rock, direction) => {
    const leftOrRight = direction === jet.left ? -1 : 1
    const pushedRockPosition = shiftRock(rock, [leftOrRight, 0])

    const pushedIntoAWall = pushedRockPosition.some(m => m[0] < 0 || m[0] > 6)
    const cannotPuh = pushedRockPosition.some(r => rocks[hash(r)])

    return pushedIntoAWall || cannotPuh ? rock : pushedRockPosition
  }

  const add = rock => {
    _highestRock = Math.max(_highestRock, ...rock.map(r => r[1]))
    return rock.forEach(r => rocks[hash(r)] = true)
  }

  const print = () => {
    let out = ''
    for (let i = _highestRock; i >= 0; i--) {
      for (let j = 0; j < 7; j++) {
        out += rocks[hash([j, i])] ? '#' : '.'
      }
      out += '\n'
    }
    console.log(out)
  }

  add(initialRocks)

  return { highestRock: highestRock, newRock: newRock, fall: fallDown, push: push, add: add, debug: () => rocks, print: print }
}

export const floor = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]
export const hash = rock => `${rock[0]}:${rock[1]}`
