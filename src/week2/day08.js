import { max, range } from '../array.js'

export const highestScenicScore = input => {
  const map = treesMap(input)
  return range(0, map.maxRow)
    .flatMap(row => range(0, map.maxCol).map(col => ({ row: row, col: col })))
    .map(({ row, col }) => map.scenicScore(row, col))
    .reduce(max)
}

export const countVisibleTrees = input => {
  const map = treesMap(input)
  return range(0, map.maxRow)
    .flatMap(row => range(0, map.maxCol).map(col => ({ row: row, col: col })))
    .filter(({ row, col }) => map.visible(row, col))
    .length
}

export const treesMap = input => {
  const map = input.split('\n').map(row => row.split('').map(t => parseInt(t)))
  const maxRow = map.length
  const maxCol = map[0].length

  const treeAt = (row, col) => row >= 0 && row < maxRow && col >= 0 && col < maxCol ? map[row][col] : 0

  const visibleFromNorth = (row, col) => range(1, row).every(r => treeAt(row, col) > treeAt(row - r, col))
  const visibleFromSouth = (row, col) => range(1, maxRow - row - 1).every(r => treeAt(row, col) > treeAt(row + r, col))
  const visibleFromEast = (row, col) => range(1, col).every(c => treeAt(row, col) > treeAt(row, col - c))
  const visibleFromWest = (row, col) => range(1, maxCol - col - 1).every(c => treeAt(row, col) > treeAt(row, col + c))
  const visible = (row, col) => visibleFromNorth(row, col) || visibleFromSouth(row, col) || visibleFromEast(row, col) || visibleFromWest(row, col)

  const scenicScoreUp = (row, col) => range(1, row).find(r => treeAt(row - r, col) >= treeAt(row, col)) || row
  const scenicScoreDown = (row, col) => range(1, maxRow - row - 1).find(r => treeAt(row + r, col) >= treeAt(row, col)) || maxRow - row - 1
  const scenicScoreLeft = (row, col) => range(1, col).find(c => treeAt(row, col - c) >= treeAt(row, col)) || col
  const scenicScoreRight = (row, col) => range(1, maxCol - col - 1).find(c => treeAt(row, col + c) >= treeAt(row, col)) || maxCol - col - 1
  const scenicScore = (row, col) => scenicScoreUp(row, col) * scenicScoreDown(row, col) * scenicScoreLeft(row, col) * scenicScoreRight(row, col)

  return { maxRow, maxCol, treeAt, visibleFromNorth, visibleFromEast, visibleFromSouth, visibleFromWest, visible, scenicScore }
}
