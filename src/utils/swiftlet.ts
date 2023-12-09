import { DEFAULT_CONFIG_FILES } from '../constants'
import * as fs from 'fs-extra'
import path from 'node:path'

export const appRoot = process.cwd()

export function isTypeScript(cwd: string = appRoot): boolean {
  const tsConfigPath = path.resolve(cwd, 'tsconfig.json')

  try {
    if (fs.pathExistsSync(tsConfigPath)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error('Error checking tsconfig.json existence:', err)
    return false
  }
}

export function getMainConfigFile(opts: { cwd: string; defaultConfigFiles?: string[] }) {
  let mainConfigFile = null
  for (const configFile of opts.defaultConfigFiles || DEFAULT_CONFIG_FILES) {
    const absConfigFile = path.join(opts.cwd, configFile)
    if (fs.pathExistsSync(absConfigFile)) {
      mainConfigFile = absConfigFile
      break
    }
  }
  return mainConfigFile
}

export function transformString(input: string): string {
  return input.replace(/(?:^|-)([a-z])/g, (_, letter) => letter.toUpperCase())
}
