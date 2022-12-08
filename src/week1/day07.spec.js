import { max, min, sum } from '../array.js'
import { dailyInputLines } from '../dailyInput.js'
import { parseCommand, parseCommands, sizeOfDirectory } from './day07.js'

describe('Day 7: No Space Left On Device', () => {
  const example = ['$ cd /', '$ ls', 'dir a', '14848514 b.txt', '8504156 c.dat', 'dir d', '$ cd a', '$ ls', 'dir e', '29116 f', '2557 g', '62596 h.lst', '$ cd e', '$ ls', '584 i', '$ cd ..', '$ cd ..', '$ cd d', '$ ls', '4060174 j', '8033020 d.log', '5626152 d.ext', '7214296 k']
  let input
  beforeEach(async () => input = await dailyInputLines(7))

  describe('Part 1: No Space Left On Device', () => {
    it('cd x moves in one level', () => {
      const state = { currentDirectory: '', fs: [] }

      const state2 = parseCommand('$ cd /', state)
      expect(state2.currentDirectory).to.equal('/')
      expect(state2.fs[0]).to.deep.equal({ type: 'dir', name: '/' })

      const state3 = parseCommand('$ cd x', state2)
      expect(state3.currentDirectory).to.equal('/x')
      expect(state3.fs[1]).to.deep.equal({ type: 'dir', name: '/x' })

      const state4 = parseCommand('$ cd a', state3)
      expect(state4.currentDirectory).to.equal('/x/a')
      expect(state4.fs[2]).to.deep.equal({ type: 'dir', name: '/x/a' })
    })

    it('cd .. moves out one level', () => {
      const state = { currentDirectory: '/home/user', fs: [] }

      const state2 = parseCommand('$ cd ..', state)
      expect(state2.currentDirectory).to.equal('/home')

      const state3 = parseCommand('$ cd ..', state2)
      expect(state3.currentDirectory).to.equal('/')
    })

    it('ls 14848514 b.txt lists file as a file of current directory', () => {
      const state = { currentDirectory: '/home/user', fs: [] }

      const state2 = parseCommand('14848514 b.txt', state)
      expect(state2.fs[0]).to.deep.equal({ type: 'file', name: '/home/user/b.txt', size: 14848514 })
    })

    it('ls 14848514 b.txt on / case', () => {
      const state = { currentDirectory: '/', fs: [] }

      const state2 = parseCommand('14848514 b.txt', state)
      expect(state2.fs[0]).to.deep.equal({ type: 'file', name: '/b.txt', size: 14848514 })
    })

    it('calculates directories total size', () => {
      const fs = [
        { type: 'dir', name: '/' },
        { type: 'dir', name: '/a' },
        { type: 'dir', name: '/a/e' },
        { type: 'file', name: '/a/e/i', size: 584 },
        { type: 'file', name: '/a/f', size: 29116 },
        { type: 'file', name: '/a/g', size: 2557 },
        { type: 'file', name: '/a/h.lst', size: 62596 },
        { type: 'file', name: '/b.txt', size: 14848514 },
        { type: 'file', name: '/c.dat', size: 8504156 },
        { type: 'dir', name: '/d' },
        { type: 'file', name: '/d/j', size: 4060174 },
        { type: 'file', name: '/d/d.log', size: 8033020 },
        { type: 'file', name: '/d/d.ext', size: 5626152 },
        { type: 'file', name: '/d/k', size: 7214296 },
        { type: 'dir', name: '/d/e' },
        { type: 'file', name: '/d/e/i', size: 1111 }
      ]

      expect(sizeOfDirectory('/a/e', fs)).to.equal(584)
      expect(sizeOfDirectory('/a', fs)).to.equal(94853)
      expect(sizeOfDirectory('/d', fs)).to.equal(24933642 + 1111)
      expect(sizeOfDirectory('/', fs)).to.equal(48381165 + 1111)
      expect(sizeOfDirectory('/d/e', fs)).to.equal(1111)
    })

    it('solves example', () => {
      const fs = parseCommands(example)
      const result = fs.filter(i => i.type === 'dir')
        .map(dir => sizeOfDirectory(dir.name, fs))
        .filter(size => size < 100000)
        .reduce(sum, 0)
      expect(result).to.equal(95437)
    })

    it('solves it', () => {
      const fs = parseCommands(input)
      const result = fs.filter(i => i.type === 'dir')
        .map(dir => sizeOfDirectory(dir.name, fs))
        .filter(size => size <= 100000)
        .reduce(sum, 0)
      expect(result).to.equal(1778099)
    })
  })

  describe('Part 2: Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?', () => {
    it('solves example', () => {
      const fs = parseCommands(example)
      const usedSpace = fs.filter(i => i.type === 'dir').map(dir => sizeOfDirectory(dir.name, fs)).reduce(max)

      const result = fs.filter(i => i.type === 'dir')
        .map(dir => sizeOfDirectory(dir.name, fs))
        .filter(size => 70_000_000 - usedSpace + size >= 30_000_000)
        .reduce(min)
      expect(result).to.equal(24933642)
    })

    it('solves it', () => {
      const fs = parseCommands(input)
      const usedSpace = fs.filter(i => i.type === 'dir').map(dir => sizeOfDirectory(dir.name, fs)).reduce(max)

      const result = fs.filter(i => i.type === 'dir')
        .map(dir => sizeOfDirectory(dir.name, fs))
        .filter(size => 70_000_000 - usedSpace + size >= 30_000_000)
        .reduce(min)
      expect(result).to.equal(1623571)
    })
  })
})
