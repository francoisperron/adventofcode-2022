export const rocksPattern = () => {
  let current = 0
  return { next: () => rocks[current++ % rocks.length] }
}

export const rock = {
  '-': [[0, 0], [1, 0], [2, 0], [3, 0]],
  '+': [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  '⅃': [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
  '|': [[0, 0], [0, 1], [0, 2], [0, 3]],
  '■': [[0, 0], [1, 0], [0, 1], [1, 1]]
}

const rocks = [rock['-'], rock['+'], rock['⅃'], rock['|'], rock['■']]

export const shiftRock = (rock, shift) => rock.map(r => [r[0] + shift[0], r[1] + shift[1]])
