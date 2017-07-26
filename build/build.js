const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const rollup = require('rollup')
const rollupConfig = require('./rollup.config')
const uglify = require('rollup-plugin-uglify')
const gzip = require('zlib').createGzip()

const scan = require('weex-vue-bundle-util')

function absolute (file) {
  return path.resolve(__dirname, file)
}

function extend () {
  var to = arguments[0]
  var froms = Array.prototype.slice.call(arguments, 1)
  froms.forEach(function (from) {
    for (var key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key]
      }
    }
  })
  return to
}

function zip (filePath, callback) {
  const read = fs.createReadStream(filePath)
  const write = fs.createWriteStream(filePath + '.gz')
  read.pipe(gzip).pipe(write).on('close', () => {
    report(filePath + '.gz')
    callback && callback()
  })
}

function now () {
  const time = Date.now() - (new Date()).getTimezoneOffset() * 60000
  return (new Date(time)).toISOString().replace('T', ' ').substring(0, 16)
}

function report (filePath) {
  const size = (fs.statSync(filePath).size / 1024).toFixed(2) + 'KB'
  const file = path.relative(process.cwd(), filePath)
  console.log(` => write ${file} (${size})`)
}

function runRollup (config) {
  return new Promise((resolve, reject) => {
    rollup.rollup(config).then(bundle => {
      bundle.write(config).then(() => {
        report(config.dest)
        resolve()
      })
    })
  })
}

const config = extend({}, rollupConfig, { sourceMap: 'inline' })
const minifyConfig = extend({}, rollupConfig)
minifyConfig.dest = minifyConfig.dest.replace(/.js$/, '.min.js')
minifyConfig.plugins = minifyConfig.plugins.slice()
minifyConfig.plugins.push(uglify())

scan(webpack, webpackConfig, { output: absolute('../src/weex-vue-plugins.js') })
  .then(function (res) {
    console.log('=> weex-vue-bundle-util analyze res:')
    console.log(res)
  })
  .then(function () {
    return new Promise((resolve, reject) => {
      runRollup(config).then(() => {
        runRollup(minifyConfig).then(() => {
          zip(minifyConfig.dest, resolve)
        })
      })
    })
  })
