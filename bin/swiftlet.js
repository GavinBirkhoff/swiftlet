#!/usr/bin/env node

// require('v8-compile-cache')
const pck = require('../package.json')
require('../dist/cli/cli')
  .run({ pck })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
