import { sum } from '../array.js'
import { dailyInputLines } from '../dailyInput.js'

describe('Day 18: Boiling Boulders', () => {
  const example = ['2,2,2', '1,2,2', '3,2,2', '2,1,2', '2,3,2', '2,2,1', '2,2,3', '2,2,4', '2,2,6', '1,2,5', '3,2,5', '2,1,5', '2,3,5']
  let input
  beforeEach(async () => input = await dailyInputLines(18))

  describe('Part 1: What is the surface area of your scanned lava droplet?', () => {
    describe('surface of', () => {
      it('one cube is 6', () => {
        expect(surface([[1, 1, 1]])).to.equal(6)
      })

      it('one cube is 6', () => {
        expect(surface([[1, 1, 1]])).to.equal(6)
      })

      it('two separate cubes is 12', () => {
        expect(surface([[1, 1, 1], [2, 2, 2]])).to.equal(12)
      })

      it('two touching cubes on x axis is 10', () => {
        expect(surface([[1, 1, 1], [2, 1, 1]])).to.equal(10)
      })
    })

    describe('counts number of adjacents cubes', () => {
      it('without adjacent cubes', () => {
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [2, 2, 1]])).to.equal(0)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [2, 1, 2]])).to.equal(0)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [1, 2, 2]])).to.equal(0)
      })

      it('in all directions', () => {
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [2, 1, 1]])).to.equal(1)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [0, 1, 1]])).to.equal(1)

        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [1, 2, 1]])).to.equal(1)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [1, 0, 1]])).to.equal(1)

        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [1, 1, 2]])).to.equal(1)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [1, 1, 2]])).to.equal(1)
      })

      it('with multiple adjacent cubes', () => {
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [2, 1, 1], [1, 1, 2], [1, 2, 1]])).to.equal(3)
        expect(adjacentCubes([1, 1, 1], [[1, 1, 1], [2, 1, 1], [1, 1, 2], [1, 2, 1], [0, 1, 1], [1, 1, 0], [1, 0, 1]])).to.equal(6)
      })
    })

    it('solves example', () => {
      const cubes = parseLavaCubes(example)
      expect(surface(cubes)).to.equal(64)
    })

    it('solves it', () => {
      const cubes = parseLavaCubes(input)
      expect(surface(cubes)).to.equal(4474)
    })
  })

  describe('Part 2: What is the exterior surface area of your scanned lava droplet?', () => {
    it('solves example', () => {
      const cubes = parseLavaCubes(example)
      expect(outsideSurface(cubes)).to.equal(58)
    })

    // it('solves it', () => {
    //   const cubes = parseLavaCubes(input)
    //   expect(outsideSurface(cubes)).to.equal(1824) // too low
    // })
  })
})

const outsideSurface = cubes => {
  let insidesCubes = [...cubes]
  let result = []
  while (insidesCubes.length !== 0) {
    result.push(surface(insidesCubes))
    insidesCubes = insidesCubes.filter(cube => adjacentCubes(cube, insidesCubes) === 6)
  }
  return result.shift() - result.reduce(sum)
}

const surface = cubes => cubes.map(cube => 6 - adjacentCubes(cube, cubes)).reduce(sum)

const adjacentCubes = (cube, cubes) => {
  const x = cubes.filter(c => Math.abs(c[0] - cube[0]) === 1 && c[1] === cube[1] && c[2] === cube[2]).length
  const y = cubes.filter(c => Math.abs(c[1] - cube[1]) === 1 && c[0] === cube[0] && c[2] === cube[2]).length
  const z = cubes.filter(c => Math.abs(c[2] - cube[2]) === 1 && c[0] === cube[0] && c[1] === cube[1]).length
  return x + y + z
}

const parseLavaCubes = input => input.map(c => c.split(',').map(Number))
