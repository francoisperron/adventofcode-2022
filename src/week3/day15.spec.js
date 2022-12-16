import { dailyInputLines } from '../dailyInput.js'
import { noBeaconRangeOnRow, noBeaconsOnRow } from './day15.js'

describe('Day 15: Beacon Exclusion Zone', () => {
  const example = [
    'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
    'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
    'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
    'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
    'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
    'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
    'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
    'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
    'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
    'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
    'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
    'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
    'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
    'Sensor at x=20, y=1: closest beacon is at x=15, y=3'
  ]
  let input
  beforeEach(async () => input = await dailyInputLines(15))

  describe('Part 1: In the row where y=?, how many positions cannot contain a beacon?', () => {

    it('finds no beacon range for a single sensor', () => {
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 6)).to.deep.equal([0, 16])
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 8)).to.deep.equal([0, 16])

      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 4)).to.deep.equal([2, 14])
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 10)).to.deep.equal([2, 14])

      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 0)).to.deep.equal([6, 10])
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 14)).to.deep.equal([6, 10])

      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, -1)).to.deep.equal([7, 9])
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 15)).to.deep.equal([7, 9])

      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, -2)).to.deep.equal([8])
      expect(noBeaconRangeOnRow({ x: 8, y: 7 }, { x: 2, y: 10 }, 16)).to.deep.equal([8])
    })

    it('solves example for y = 10', () => {
      expect(noBeaconsOnRow(example, 10)).to.equal(26)
    })

    it('solves it for y = 2_000_000', () => {
      expect(noBeaconsOnRow(input, 2_000_000)).to.equal(6425133)
    })
  })

  // describe('Part 2: What is its tuning frequency?', () => {
  //   it('solves example for tuning = x  * 20 + y', () => {
  //     expect(tuningFrequency(example, 20)).to.equal(56000011)
  //   })
  //
  //   it('solves it for tuning = x  * 4_000_000 + y', () => {
  //     expect(tuningFrequency(input, 4_000_000)).to.equal(0)
  //   })
  // })
})
