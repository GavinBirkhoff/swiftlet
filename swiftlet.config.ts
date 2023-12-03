import path from 'path'

// const input = path.resolve('./example/', 'main.js')
const input = path.resolve('./src/', 'index.ts')

export default {
  input,
  output: [
    {
      format: 'es',
      file: `lib/swiftlet.esm.js`,
      sourcemap: true
    }
  ]
}
