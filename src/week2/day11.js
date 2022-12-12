import { descending, multiply } from '../array.js'

export const monkeyBusinessPart1 = (monkeys) => monkeyBusiness(monkeys, 20, (level) => Math.trunc(level / 3))

export const monkeyBusinessPart2 = (monkeys, dividers) => {
  const dontWorry = dividers.reduce(multiply, 1)
  return monkeyBusiness(monkeys, 10000, (level) => level % dontWorry)
}

const monkeyBusiness = (monkeys, rounds, manageWorryLevel) => {
  for (let round = 0; round < rounds; round++) {
    for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
      monkeyTurn(monkeyNumber, monkeys, manageWorryLevel)
    }
  }
  return monkeys
    .map(m => m.inspections)
    .sort(descending)
    .slice(0, 2)
    .reduce(multiply)
}

export const monkeyTurn = (monkeyNumber, monkeys, manageWorryLevel) => {
  const monkey = monkeys[monkeyNumber]
  for (const item of monkey.items) {
    const level = manageWorryLevel(monkey.op(item))
    const receivingMonkey = monkey.test(level)
    monkeys[receivingMonkey].items.push(level)
    monkey.inspections++
  }
  monkey.items = []
}
