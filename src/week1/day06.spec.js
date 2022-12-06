import { dailyInput } from '../dailyInput.js'

describe('Day 6: Tuning Trouble', () => {
  let input
  beforeEach(async () => {
    input = await dailyInput(6)
  })

  describe('Part 1: How many characters need to be processed before the first start-of-packet marker is detected?', () => {
    it('solves examples', () => {
      expect(detectStartOfPacketMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).to.equal(7)
      expect(detectStartOfPacketMarker('bvwbjplbgvbhsrlpgdmjqwftvncz')).to.equal(5)
      expect(detectStartOfPacketMarker('nppdvjthqldpwncqszvftbrmjlhg')).to.equal(6)
      expect(detectStartOfPacketMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).to.equal(10)
      expect(detectStartOfPacketMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).to.equal(11)
    })

    it('sovles it', () => {
      expect(detectStartOfPacketMarker(input)).to.equal(1356)
    })
  })

  describe('Part 2: How many characters need to be processed before the first start-of-message marker is detected?', () => {
    it('solves examples', () => {
      expect(detectStartOfPacketMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).to.equal(19)
      expect(detectStartOfPacketMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).to.equal(23)
      expect(detectStartOfPacketMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).to.equal(23)
      expect(detectStartOfPacketMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).to.equal(29)
      expect(detectStartOfPacketMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).to.equal(26)
    })

    it('solves it', () => {
      expect(detectStartOfPacketMarker(input, 14)).to.equal(2564)
    })
  })
})

const detectStartOfPacketMarker = (input, marker = 4) => {
  const datastream = input.split('')
  for (let i = 0; i < datastream.length; i++) {
    const part = datastream.slice(i, i + marker)
    if (part.filter((char, index) => part.indexOf(char) !== index).length === 0)
      return i + marker
  }
}
