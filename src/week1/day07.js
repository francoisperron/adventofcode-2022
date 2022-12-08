import { sum } from '../array.js'

export const parseCommands = input => input
    .filter(c => c !== '$ ls')
    .filter(c => !c.startsWith('dir'))
    .reduce((state, c) => parseCommand(c, state), { currentDirectory: '', fs: [] })
    .fs

export const parseCommand = (command, state) => {
  const args = command.split(' ')

  if (args[0] === '$') {
    const currentDirectory = cd(args[2], state)
    if (state.fs.some(i => i.name === currentDirectory)) {
      return { currentDirectory: currentDirectory, fs: state.fs }
    } else {
      return { currentDirectory: currentDirectory, fs: [...state.fs, { type: 'dir', name: currentDirectory }] }
    }
  } else {
    return { currentDirectory: state.currentDirectory, fs: [...state.fs, { type: 'file', name: state.currentDirectory === '/' ? `/${args[1]}` : `${state.currentDirectory}/${args[1]}`, size: parseInt(args[0]) }] }
  }
}

const cd = (param, state) => {
  if (param === '..') return state.currentDirectory.substring(0, state.currentDirectory.lastIndexOf('/')) || '/'
  else if (param === '/') return param
  else if (state.currentDirectory === '/') return `/${param}`
  else return `${state.currentDirectory}/${param}`
}

export const sizeOfDirectory = (dir, fs) => fs
  .filter(d => d.type === 'file' && d.name.startsWith(dir === '/' ? '/' : dir + '/'))
  .map(d => d.size)
  .reduce(sum, 0)
