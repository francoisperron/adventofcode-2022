import { range } from '../array.js'

export const positionVisitedByTail = (motions, knots = 2) => {
  const rope = range(1, knots).map(() => ({ x: 0, y: 0, visited: new Set() }))

  motions.map(motion => {
    const direction = motion.split(' ')[0]
    const steps = parseInt(motion.split(' ')[1])

    for (let step = 0; step < steps; step++) {
      rope[0] = moveHead[direction](rope[0])
      for (let knot = 1; knot < knots; knot++) {
        rope[knot] = moveTail(rope[knot - 1], rope[knot])
      }
    }
  })
  return rope[knots - 1].visited.size
}

export const moveHead = {
  'L': (pos) => ({ x: pos.x - 1, y: pos.y }),
  'R': (pos) => ({ x: pos.x + 1, y: pos.y }),
  'U': (pos) => ({ x: pos.x, y: pos.y + 1 }),
  'D': (pos) => ({ x: pos.x, y: pos.y - 1 })
}

export const moveTail = (head, tail) => {
  const newTail = { ...tail }
  const dx = head.x - tail.x
  const dy = head.y - tail.y

  if (Math.abs(dx) > 1) {
    newTail.x += moveOne(dx)
    newTail.y += dy === 0 ? 0 : moveOne(dy)
  } else if (Math.abs(dy) > 1) {
    newTail.y += moveOne(dy)
    newTail.x += dx === 0 ? 0 : moveOne(dx)
  }

  newTail.visited.add(newTail.x + '-' + newTail.y)
  return newTail
}

const moveOne = diff => diff > 0 ? 1 : -1
