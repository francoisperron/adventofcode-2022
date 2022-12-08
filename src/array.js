export const descending = (a, b) => -(a - b)
export const sum = (a, b) => a + b
export const groupBy = (groups, value, index) => (grouping) => (grouping(groups, value, index) ? groups[groups.length - 1].push(value) : groups.push([value])) && groups
export const min = (min, value) => (min < value ? min : value)
export const max = (max, value) => (max > value ? max : value)

