import * as fs from 'fs-extra'
import SwiftletTask from './SwiftletTask'

export class DeleteTask extends SwiftletTask {
  private readonly paths: string[]

  public constructor(paths: string[]) {
    super()
    this.paths = paths
  }

  async runImpl(): Promise<void> {
    for (const file of this.paths) {
      // eslint-disable-next-line import/namespace
      if (fs.existsSync(file)) {
        await fs.remove(file)
      }
    }
  }
}

export default DeleteTask
