import { InputPluginOption, OutputOptions, RollupBuild, RollupOptions, rollup } from 'rollup'
import SwiftletTask from './SwiftletTask'

class RollupTask extends SwiftletTask {
  rollupOptions: RollupOptions
  outputOptionsList?: OutputOptions[]
  constructor(options: RollupOptions) {
    super()
    this.rollupOptions = options
    if (options.output) {
      if (Array.isArray(options.output)) {
        this.outputOptionsList = options.output
      } else {
        this.outputOptionsList = [options.output]
      }
    }
  }
  async build() {
    let bundle
    let buildFailed = false
    try {
      bundle = await rollup(this.rollupOptions)

      console.log(bundle.watchFiles)

      await this.generateOutputs(bundle)
    } catch (error) {
      buildFailed = true
      console.error(error)
    }
    if (bundle) {
      await bundle.close()
    }
    process.exit(buildFailed ? 1 : 0)
  }
  async generateOutputs(bundle: RollupBuild) {
    if (!this.outputOptionsList) return
    for (const outputOptions of this.outputOptionsList) {
      await bundle.write(outputOptions)

      const { output } = await bundle.generate(outputOptions)

      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
          console.log('Asset', chunkOrAsset)
        } else {
          console.log('Chunk', chunkOrAsset.modules)
        }
      }
    }
  }
  async runImpl(): Promise<void> {
    await this.build()
  }
}

export default RollupTask
