import { jet } from './jetsPattern.js'
import { shiftRock } from './rocksPattern.js'

export const tetrisRoom = (initialRocks = floor) => {
  const rocks = [...initialRocks]
  const newRock = (rock) => shiftRock(rock, [2, 4 + highestRock()])

  const highestRock = () => Math.max(...rocks.map(r => r[1]))

  const fallDown = rock => {
    const fellRockPosition = shiftRock(rock, [0, -1])
    const cannotFall = fellRockPosition.some(m => rocks.some(r => r[0] === m[0] && r[1] === m[1]))
    return cannotFall ? rock : fellRockPosition
  }

  const push = (rock, direction) => {
    const leftOrRight = direction === jet.left ? -1 : 1
    const pushedRockPosition = shiftRock(rock, [leftOrRight, 0])

    const pushedIntoAWall = pushedRockPosition.some(m => m[0] < 0 || m[0] > 6)
    const cannotPuh = pushedRockPosition.some(m => rocks.some(r => r[0] === m[0] && r[1] === m[1]))

    return pushedIntoAWall || cannotPuh ? rock : pushedRockPosition
  }

  const add = rock => rocks.push(...rock)

  const print = () => {
    let out = ''
    for (let i = highestRock(); i >= 0; i--) {
      for (let j = 0; j < 7; j++) {
        out += rocks.find(r => r[0] === j && r[1] === i) ? '#' : '.'
      }
      out += '\n'
    }
    console.log(out)
  }

  return { highestRock, newRock: newRock, fall: fallDown, push: push, add: add, debug: () => rocks, print: print }
}

export const floor = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]]
