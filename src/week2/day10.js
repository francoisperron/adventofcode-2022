import { range, sum } from '../array.js'

export const clockCircuitPart1 = input => [20, 60, 100, 140, 180, 220]
  .map(cycle => cycle * xValueAt(cycle, input))
  .reduce(sum)

export const renderImagePart2 = input => {
  const crt = range(0, 240).map(() => '.')

  for (let row = 0; row < 6; row++) {
    for (let cycle = 0; cycle < 240; cycle++) {
      const value = xValueAt(cycle + 1, input)
      const sprite = [(row * 40) + value - 1, (row * 40) + value, (row * 40) + value + 1]
      if (sprite.includes(cycle))
        crt[cycle] = '#'
    }
  }

  return crt.join('').match(/.{1,40}/g).join('\n')
}

export const xValueAt = (cycle, input) => {
  let currentCycle = 0
  return input
    .map(i => ({ duration: i.split(' ')[0] === 'noop' ? 1 : 2, V: parseInt(i.split(' ')[1]) || 0 }))
    .map(i => {
      currentCycle += i.duration
      return ({ cycles: currentCycle, ...i })
    })
    .filter(i => i.cycles < cycle)
    .map(i => i.V)
    .reduce(sum, 1)
}
