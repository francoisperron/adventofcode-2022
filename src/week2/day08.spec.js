import { dailyInput } from '../dailyInput.js'
import { highestScenicScore, treesMap, countVisibleTrees } from './day08.js'

describe('Day 8: Treetop Tree House', () => {
  const example =
    '30373\n' +
    '25512\n' +
    '65332\n' +
    '33549\n' +
    '35390'

  let input
  beforeEach(async () => input = await dailyInput(8))

  describe('Part 1: Consider your map; how many trees are visible from outside the grid?', () => {
    it('parses trees map', () => {
      const map = treesMap(example)
      expect(map.treeAt(0, 0)).to.equal(3)
      expect(map.treeAt(4, 4)).to.equal(0)
    })

    it('trees outside the map have a heigth of 0', () => {
      const map = treesMap(example)
      expect(map.treeAt(-1, 0)).to.equal(0)
      expect(map.treeAt(0, -1)).to.equal(0)
      expect(map.treeAt(5, 0)).to.equal(0)
      expect(map.treeAt(0, 5)).to.equal(0)
    })

    it('determines if a tree is visible from the north', () => {
      const map = treesMap(example)
      expect(map.visibleFromNorth(0, 0)).to.equal(true)
      expect(map.visibleFromNorth(1, 1)).to.equal(true)
      expect(map.visibleFromNorth(2, 1)).to.equal(false)
      expect(map.visibleFromNorth(2, 2)).to.equal(false)
    })

    it('determines if a tree is visible from the south', () => {
      const map = treesMap(example)
      expect(map.visibleFromSouth(0, 0)).to.equal(false)
      expect(map.visibleFromSouth(2, 0)).to.equal(true)
      expect(map.visibleFromSouth(3, 2)).to.equal(true)
      expect(map.visibleFromSouth(2, 2)).to.equal(false)
    })

    it('determines if a tree is visible from the east', () => {
      const map = treesMap(example)
      expect(map.visibleFromEast(0, 0)).to.equal(true)
      expect(map.visibleFromEast(1, 1)).to.equal(true)
      expect(map.visibleFromEast(1, 2)).to.equal(false)
      expect(map.visibleFromEast(3, 3)).to.equal(false)
    })

    it('determines if a tree is visible from the west', () => {
      const map = treesMap(example)
      expect(map.visibleFromWest(0, 0)).to.equal(false)
      expect(map.visibleFromWest(1, 3)).to.equal(false)
      expect(map.visibleFromWest(2, 3)).to.equal(true)
    })

    it('solves example', () => {
      expect(countVisibleTrees(example)).to.equal(21)
    })

    it('solves it', () => {
      expect(countVisibleTrees(input)).to.equal(1647)
    })
  })

  describe('Part 2: Consider each tree on your map. What is the highest scenic score possible for any tree?', () => {
    it('calculates scenic score', () => {
      const map = treesMap(example)
      expect(map.scenicScore(1, 2)).to.equal(4)
      expect(map.scenicScore(3, 2)).to.equal(8)
    })

    it('solves example', () => {
      expect(highestScenicScore(example)).to.equal(8)
    })

    it('solves it', () => {
      expect(highestScenicScore(input)).to.equal(392080)
    })
  })
})
