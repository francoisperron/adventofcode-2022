import { multiply, sum } from '../array.js'

export const pairInOrderPart1 = input => parseDistressSignals(input)
  .map((pair, i) => isPairInOrder(pair) ? i + 1 : 0)
  .reduce(sum, 0)

export const pairInOrderPart2 = input => parseDistressSignals(input)
  .flat()
  .concat([[2]], [[6]])
  .sort((p1, p2) => isPairInOrder([p1, p2]) ? -1 : 1)
  .map((pair, i) => JSON.stringify(pair) === JSON.stringify([2]) || JSON.stringify(pair) === JSON.stringify([6]) ? i + 1 : 1)
  .reduce(multiply, 1)

export const isPairInOrder = pair => {
  let left = pair[0]
  let right = pair[1]

  if (bothNumbers(left, right))
    return areValuesInOrder(left, right)

  left = toArray(left)
  right = toArray(right)

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const order = isPairInOrder([left[i], right[i]])

    if (order !== undefined)
      return order
  }

  return areValuesInOrder(left.length, right.length)
}

const bothNumbers = (left, right) => !Array.isArray(left) && !Array.isArray(right)
const areValuesInOrder = (left, right) => left < right ? true : left > right ? false : undefined
const toArray = value => [value].flat()

export const parseDistressSignals = input => input
  .split('\n\n')
  .map(pair => pair.split('\n').map(packet => eval(packet)))
