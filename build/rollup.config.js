const path = require('path')
const json = require('rollup-plugin-json')
const postcss = require('rollup-plugin-postcss')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')

const repoUrl = 'https://github.com/MrRaindrop/weex-vue-bundle-util-demo/'
const banner = `console.log('demo for packing with weex-vue-bundle-util: ${repoUrl}');\n\n`

module.exports = {
  moduleName: 'demo',
  entry: path.resolve(__dirname, '../src/render.js'),
  dest: path.resolve(__dirname, '../dist/index.js'),
  banner,
  format: 'umd',
  plugins: [
    json(),
    postcss(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    flow(),
    commonjs(),
    buble()
  ]
}
