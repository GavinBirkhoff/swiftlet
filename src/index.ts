import { SwiftletOptions } from './types/index'
import swiftlet from './swiftlet'

import config from '../swiftlet.config'

export { SwiftletOptions }

const compiler = swiftlet(config)

compiler.run()

export default swiftlet
