import { descending } from '../array.js'

export const noBeaconsOnRow = (input, row) => {
  const ranges = input
    .map(parseLine)
    .flatMap(({ sensor, beacon }) => noBeaconRangeOnRow(sensor, beacon, row))
    .sort(descending)

  return ranges.shift() - ranges.pop()
}

export const noBeaconRangeOnRow = (sensor, beacon, row) => {
  const distance = manhattanDistance(sensor, beacon) - Math.abs(row - sensor.y)
  return distance > 0 ? [sensor.x - distance, sensor.x + distance] : distance === 0 ? [sensor.x] : []
}
const manhattanDistance = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

const parseLine = line => {
  const p = line.match(/Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/i).map(Number)
  return { sensor: { x: p[1], y: p[2] }, beacon: { x: p[3], y: p[4] } }
}
