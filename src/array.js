export const descending = (a, b) => -(a - b)
export const sum = (a, b) => a + b
export const groupBy = (groups, value, index) => (grouping) => (grouping(groups, value, index) ? groups[groups.length - 1].push(value) : groups.push([value])) && groups

