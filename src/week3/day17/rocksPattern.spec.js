import { rock, rocksPattern } from './rocksPattern.js'

describe('The rocks pattern', () => {
  it('simulates next rock', () => {
    const rocks = rocksPattern()

    expect(rocks.next()).to.deep.equal(rock['-'])
    expect(rocks.next()).to.deep.equal(rock['+'])
    expect(rocks.next()).to.deep.equal(rock['⅃'])
    expect(rocks.next()).to.deep.equal(rock['|'])
    expect(rocks.next()).to.deep.equal(rock['■'])
  })

  it('repeats when it reach the end', () => {
    const rocks = rocksPattern()
    for (let i = 0; i < 5; i++)
      rocks.next()

    expect(rocks.next()).to.deep.equal(rock['-'])
  })
})
