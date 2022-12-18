import { jetsPattern } from './jetsPattern.js'
import { rocksPattern } from './rocksPattern.js'
import { tetrisRoom } from './tetrisRoom.js'

export const playTetris = (input, nbRocks = 2022) => {
  const tetris = tetrisRoom()
  const jets = jetsPattern(input)
  const rocks = rocksPattern()

  for (let i = 0; i < nbRocks; i++) {
    let rock = tetris.newRock(rocks.next())
    moveRock(rock, tetris, jets)
  }
  return tetris.highestRock()
}

const moveRock = (rock, tetris, jets) => {
  let nextMove = move.push
  let rockStopped = false

  while (!rockStopped) {
    if (nextMove === move.push) {
      rock = tetris.push(rock, jets.next())
      nextMove = move.fall
    } else {
      const fellRock = tetris.fall(rock)
      if (fellRock !== rock) {
        rock = fellRock
      } else {
        tetris.add(rock)
        rockStopped = true
      }
      nextMove = move.push
    }
  }
}

const move = { push: 'push', fall: 'fall' }
