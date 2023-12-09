# Swiftlet

Web dev build tool

## Usage

Install the package:

```shell
npm install --save-dev swiftlet

yarn add --dev swiftlet

pnpm add --save-dev swiftlet
```

Create a `swiftlet.config.js` file in your project root:

```js
const path = require('path')
const { defineConfig } = require('swiftlet')

const input = path.resolve('./src/', 'index.js')

module.exports = {
  input,
  target: ['esm', 'cjs', 'umd'],
  outDir: './dist'
}
```

## CLI

Start building an app

```shell
swiftlet build
```

```text
Usage: swiftlet [options] [command]

Web dev build tool

Options:
  -v, --version   output the version number
  -h, --help      display help for command

Commands:
  build           build an app
  help [command]  display help for command
```
