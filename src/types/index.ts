import { InputPluginOption, ModuleFormat, RollupOptions } from 'rollup'

export enum SwiftJSTransformerTypes {
  BABEL = 'babel',
  ESBUILD = 'esbuild',
  SWC = 'swc'
}

export enum SwiftPlatformTypes {
  NODE = 'node',
  BROWSER = 'browser'
}

export enum SwiftBundlesTypes {
  ESM = 'esm',
  CJS = 'cjs'
}
export interface SwiftletOptions {
  input: string
  outDir?: string
  target?: ModuleFormat | ModuleFormat[]
  sourcemap?: boolean
  plugins?: InputPluginOption[]
  rollupOptions?: RollupOptions
}

export type ShellInputOptions = Partial<SwiftletOptions>
