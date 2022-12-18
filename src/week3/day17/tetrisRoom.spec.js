import { jet } from './jetsPattern.js'
import { rock, shiftRock } from './rocksPattern.js'
import { floor, tetrisRoom } from './tetrisRoom.js'

describe('The tetris room', () => {

  describe('calculates the highest rock', () => {
    it('is 0 with only the floor', () => {
      const tetris = tetrisRoom()

      expect(tetris.highestRock()).to.equal(0)
    })

    it('is 1 with the \'-\' block', () => {
      const rocks = [...floor, ...shiftRock(rock['-'], [3, 1])]
      const tetris = tetrisRoom(rocks)

      expect(tetris.highestRock()).to.equal(1)
    })
  })

  describe('when a rock enters', () => {
    it('enters new rock at [2, 4] when theres only the floor', () => {
      const tetris = tetrisRoom()

      expect(tetris.newRock(rock['⅃'])).to.deep.equal(shiftRock(rock['⅃'], [2, 4]))
    })

    it('enters new rock at [2, maxY + 4] when theres other rocks', () => {
      const rocks = [...floor, ...shiftRock(rock['-'], [3, 1])]
      const tetris = tetrisRoom(rocks)

      expect(tetris.newRock(rock['-'])).to.deep.equal(shiftRock(rock['-'], [2, 1 + 4]))
    })
  })

  describe('when a rock falls down', () => {
    it('falls one unit down', () => {
      const tetris = tetrisRoom()
      const fallingRock = tetris.newRock(rock['-'])

      expect(tetris.fall(fallingRock)).to.deep.equal(shiftRock(fallingRock, [0, -1]))
    })

    it('stops when the rock cant fall', () => {
      const tetris = tetrisRoom()
      let fallingRock = tetris.newRock(rock['-'])
      for (let i = 0; i < 3; i++) {
        fallingRock = tetris.fall(fallingRock)
      }

      expect(tetris.fall(fallingRock)).to.equal(fallingRock)
    })
  })

  describe('when a rock is pushed', () => {
    it('moves left', () => {
      const tetris = tetrisRoom()
      const fallingRock = tetris.newRock(rock['-'])

      expect(tetris.push(fallingRock, jet.left)).to.deep.equal(shiftRock(fallingRock, [-1, 0]))
    })

    it('moves right', () => {
      const tetris = tetrisRoom()
      const fallingRock = tetris.newRock(rock['-'])

      expect(tetris.push(fallingRock, jet.right)).to.deep.equal(shiftRock(fallingRock, [1, 0]))
    })

    it('stops at edges 0', () => {
      const tetris = tetrisRoom()
      let fallingRock = tetris.newRock(rock['-'])
      for (let i = 0; i < 2; i++) {
        fallingRock = tetris.push(fallingRock, jet.left)
      }

      expect(tetris.push(fallingRock, jet.left)).to.equal(fallingRock)
    })

    it('stops at edges 6', () => {
      const tetris = tetrisRoom()
      let fallingRock = tetris.newRock(rock['-'])
      fallingRock = tetris.push(fallingRock, jet.right)

      expect(tetris.push(fallingRock, jet.right)).to.equal(fallingRock)
    })

    it('stops on other rocks', () => {
      const tetris = tetrisRoom()
      const fallingRock = tetris.newRock(rock['-'])
      tetris.add([[6, 4]])

      expect(tetris.push(fallingRock, jet.right)).to.equal(fallingRock)
    })
  })

  describe('adding a rock to the rocks', () => {
    it('adds it', () => {
      const tetris = tetrisRoom()
      tetris.add(shiftRock(rock['-'], [3, 1]))

      expect(tetris.highestRock()).to.equal(1)
    })
  })
})


/*
[
  [ 0, 0 ], [ 1, 0 ],
  [ 2, 0 ], [ 3, 0 ],
  [ 4, 0 ], [ 5, 0 ],
  [ 6, 0 ], [ 3, 1 ],
  [ 4, 1 ], [ 5, 1 ],
  [ 6, 1 ]
]

[
  [ 0, 0 ], [ 1, 0 ],
  [ 2, 0 ], [ 3, 0 ],
  [ 4, 0 ], [ 5, 0 ],
  [ 6, 0 ], [ 6, 4 ],
  [ 3, 1 ], [ 4, 1 ],
  [ 5, 1 ], [ 6, 1 ]
]
 */
