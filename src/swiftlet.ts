import Compiler from './Compiler'
import { SwiftletOptions, ShellInputOptions } from './types'

function swiftlet(options: SwiftletOptions) {
  const shellOptions: ShellInputOptions = process.argv.slice(2).reduce<ShellInputOptions>((config: any, arg) => {
    const [key, value] = arg.split('=')
    // TODO
    config[key] = value
    return config
  }, {})
  const finalOptions = { ...options, ...shellOptions }
  // console.log(finalOptions)
  const compiler = new Compiler(finalOptions)

  return compiler
}

export default swiftlet
