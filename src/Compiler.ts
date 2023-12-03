import { RollupOptions } from 'rollup'
import RollupTask from './tasket/RollupTask'
import { SwiftletOptions } from './types'
import DeleteTask from './tasket/DeleteTask'
import path from 'path'
class Compiler {
  readonly inputOptions: SwiftletOptions
  constructor(options: SwiftletOptions) {
    this.inputOptions = options
  }
  async run() {
    const clean = new DeleteTask([path.resolve(process.cwd(), 'lib')])
    clean.run()
    const rollupOptions: RollupOptions = {
      input: this.inputOptions.input,
      output: this.inputOptions.output
    }
    const rollupTask = new RollupTask(rollupOptions)
    await rollupTask.run()
  }
}

export default Compiler
