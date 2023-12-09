import { InputPluginOption, OutputOptions, RollupBuild, RollupOptions } from 'rollup'
import SwiftletTask from './SwiftletTask'

class RollupTask extends SwiftletTask {
  rollupOptions: RollupOptions
  outputOptionsList?: OutputOptions[]
  constructor(options: RollupOptions) {
    super()
    this.rollupOptions = options
    this.outputOptionsList = options.output as OutputOptions[]
  }

  async build(options: RollupOptions): Promise<boolean> {
    let bundle: RollupBuild | undefined
    let buildFailed = false
    try {
      const { rollup } = await import('rollup')
      bundle = await rollup(options)
      await this.generateOutputs(bundle)
    } catch (error) {
      buildFailed = true
      console.error(error)
    } finally {
      if (bundle) await bundle.close()
    }
    // process.exit(buildFailed ? 1 : 0)
    return buildFailed
  }
  async generateOutputs(bundle: RollupBuild) {
    if (!this.outputOptionsList) return
    for (const outputOptions of this.outputOptionsList) {
      await bundle.write(outputOptions)
    }
  }
  async runImpl(): Promise<boolean> {
    const buildFailed = await this.build(this.rollupOptions)
    return buildFailed
  }
}

export default RollupTask
