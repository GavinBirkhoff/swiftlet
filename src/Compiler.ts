import { OutputOptions, RollupOptions, defineConfig } from 'rollup'
import RollupTask from './tasket/RollupTask'
import { SwiftletOptions } from './types'
import DeleteTask from './tasket/DeleteTask'
import path from 'node:path'
import { SyncHook } from 'tapable'
import { appRoot } from './utils'
import { createRollupOptions } from './utils/rollup'
import chalk from 'chalk'

class Compiler {
  readonly inputOptions: SwiftletOptions
  protected readonly hooks

  constructor(options: SwiftletOptions) {
    this.inputOptions = {
      ...options,
      outDir: options.outDir ?? 'dist'
    }
    this.hooks = {
      entryOption: new SyncHook(), // start
      compile: new SyncHook(), // compile
      afterCompile: new SyncHook(), // end
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }
  }

  async run() {
    const { outDir } = this.inputOptions
    console.log(`clean ${outDir} ...`)
    const cleanTask = new DeleteTask([path.resolve(appRoot, outDir as string)])
    await cleanTask.run()
    console.log(chalk.green(`clean success`))
    console.log(`build ...`)
    const rollupOptions: RollupOptions[] = await createRollupOptions(this.inputOptions)
    for (const options of rollupOptions) {
      const rollupTask = new RollupTask(options)
      const buildFailed = await rollupTask.run()
      buildFailed && process.exit(1)
    }
    console.log(chalk.green(`build success`))
    this.hooks.done.call('done')
  }
}

export default Compiler
