abstract class SwiftletTask {
  private readonly root: string
  protected readonly debug: boolean

  constructor() {
    this.root = process.cwd()
    this.debug = process.env['SFL_DEBUG'] !== undefined
  }

  getName(): string {
    return this.constructor.name
  }

  getRoot(): string {
    return this.root
  }

  async run() {
    await this.runImpl()
  }
  abstract runImpl(): Promise<void>
}

export default SwiftletTask
