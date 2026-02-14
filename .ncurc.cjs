module.exports = {
  target: (name) => {
    const minorOnly = ['@types/node', 'eslint']
    return minorOnly.includes(name) ? 'minor' : 'latest'
  },
}
