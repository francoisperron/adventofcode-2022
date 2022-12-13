export const fewestStepsPart1 = input => {
  const { start, end, map } = parseHeightmap(input)
  const foundIt = (start, end) => end.x === start.x && end.y === start.y

  return fewestSteps(start, end, map, foundIt)
}

export const fewestStepsPart2 = input => {
  const { start, end, map } = parseHeightmap(input)
  const foundIt = (start) => start.height === 'a'.charCodeAt(0)

  return fewestSteps(start, end, map, foundIt)
}

export const fewestSteps = (start, end, map, foundIt) => {
  const toVisit = [end]
  while (toVisit.length !== 0) {
    const point = toVisit.shift()
    for (const adjacent of adjacentsTo(point, map)) {
      if (foundIt(adjacent, start)) {
        return point.distance + 1
      } else {
        adjacent.distance = point.distance + 1
        toVisit.push(adjacent)
      }
    }
  }
}

export const adjacentsTo = (point, map) =>
  [{ x: point.x - 1, y: point.y }, { x: point.x + 1, y: point.y }, { x: point.x, y: point.y - 1 }, { x: point.x, y: point.y + 1 }]
    .map(a => map.find(point => pointsAreEqual(point, a)))
    .filter(a => a !== undefined)
    .filter(a => a.distance === 0)
    .filter(a => (point.height - a.height) < 2)

const pointsAreEqual = (p1, p2) => p1.x === p2.x && p1.y === p2.y

export const parseHeightmap = input => {
  const map = input
    .split('\n')
    .flatMap((row, y) => row.split('').map((height, x) => ({ x: x, y: y, height: height.charCodeAt(0), distance: 0 })))

  const start = map.find(p => p.height === 'S'.charCodeAt(0))
  start.height = 'a'.charCodeAt(0)

  const end = map.find(p => p.height === 'E'.charCodeAt(0))
  end.height = 'z'.charCodeAt(0)

  return { start, end, map }
}
