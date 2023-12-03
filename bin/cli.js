#!/usr/bin/env node

const path = require('path')
const config = require(path.resolve('swiftlet.config.js'))

const swiftlet = require('../src/swiftlet')
const compiler = swiftlet(config)

compiler.run()
