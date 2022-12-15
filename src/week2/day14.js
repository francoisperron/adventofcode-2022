import { descending, hash, range2 } from '../array.js'

export const simulateFallingSandPart2 = input => {
  let cave = parseRocks(input)
  const floorY = [...cave].map(r => parseInt(r.split(':')[1])).sort(descending).shift() + 2
  const floor = range2(500 - floorY * 2, 500 + floorY * 2).map(x => hash({ x: x, y: floorY }))
  cave = new Set([...cave, ...floor])

  const endCondition = (sand, solid) => solid.has(hash(sand))
  return simulate(cave, endCondition)
}

export const simulateFallingSandPart1 = input => {
  const cave = parseRocks(input)
  const maxY = [...cave].map(r => parseInt(r.split(':')[1])).sort(descending).shift()
  const endCondition = (sand) => sand.y === maxY

  return simulate(cave, endCondition)
}

const simulate = (cave, endCondition) => {
  let initialCaveSize = cave.size
  let found = false
  while (!found) {
    found = simulateFallingSand(cave, endCondition, { x: 500, y: 0 })
  }
  return cave.size - initialCaveSize
}

export const simulateFallingSand = (cave, endCondition, fallingSand) => {

  if (endCondition(fallingSand, cave)) {
    return true
  }

  const under = { x: fallingSand.x, y: fallingSand.y + 1 }
  if (!cave.has(hash(under)))
    return simulateFallingSand(cave, endCondition, under)

  const left = { x: fallingSand.x - 1, y: fallingSand.y + 1 }
  if (!cave.has(hash(left)))
    return simulateFallingSand(cave, endCondition, left)

  const right = { x: fallingSand.x + 1, y: fallingSand.y + 1 }
  if (!cave.has(hash(right)))
    return simulateFallingSand(cave, endCondition, right)

  cave.add(hash(fallingSand))
}

export const parseRocks = input => new Set(input.flatMap(parseRock))

export const parseRock = line => line
  .split('->')
  .map(path => path.split(',').map(v => parseInt(v)))
  .flatMap((path, index, paths) => createPath(path, paths[index + 1]))

const createPath = (path, nextPath) => nextPath === undefined
  ? []
  : path[0] === nextPath[0]
    ? range2(path[1], nextPath[1]).map(y => hash({ x: path[0], y: y }))
    : range2(path[0], nextPath[0]).map(x => hash({ x: x, y: path[1] }))

