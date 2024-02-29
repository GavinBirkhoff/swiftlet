const path = require('path')
const { defineConfig } = require('swiftlet')

const input = path.resolve('./src/', 'index.js')

module.exports = defineConfig({
  input,
  target: ['esm', 'cjs', 'umd'],
  outDir: './dist'
})
