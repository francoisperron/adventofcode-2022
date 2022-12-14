export const descending = (a, b) => -(a - b)
export const sum = (a, b) => a + b
export const multiply = (a, b) => a * b
export const groupBy = (groups, value, index) => (grouping) => (grouping(groups, value, index) ? groups[groups.length - 1].push(value) : groups.push([value])) && groups
export const min = (min, value) => (min < value ? min : value)
export const max = (max, value) => (max > value ? max : value)

export const range = (from, to) => Array.from({ length: to }, (_, index) => index + from)
export const range2 = (from, to) => Array.from({ length: Math.abs(to - from) + 1 }, (_, index) => from + ((to > from ? 1 : -1) * index))

export const hash = ({ x, y }) => `${x}:${y}`
