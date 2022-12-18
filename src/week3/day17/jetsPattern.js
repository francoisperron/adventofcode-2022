export const jetsPattern = input => {
  let current = 0
  const jets = input.split('')
  return { next: () => jets[current++ % jets.length] }
}

export const jet = { right: '>', left: '<' }
