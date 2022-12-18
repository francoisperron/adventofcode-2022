import { jet, jetsPattern } from './jetsPattern.js'

describe('The jets pattern', () => {
  it('gets jet pattern from input', () => {
    const jets = jetsPattern('><<')

    expect(jets.next()).to.equal(jet.right)
    expect(jets.next()).to.equal(jet.left)
    expect(jets.next()).to.equal(jet.left)
  })

  it('repeats when it reach the end', () => {
    const jets = jetsPattern('>')

    expect(jets.next()).to.equal(jet.right)
    expect(jets.next()).to.equal(jet.right)
    expect(jets.next()).to.equal(jet.right)
  })
})
