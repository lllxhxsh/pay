'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.3.128:21000"',
  // API_ROOT: '"http://127.0.0.1:8080"', //API地址
})
