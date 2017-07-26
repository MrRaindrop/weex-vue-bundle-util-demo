var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }, {
        test: /\.vue(\?[^?]+)?$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false,
          /**
           * important! should use postTransformNode to add $processStyle for
           * inline style normalization.
           */
          compilerModules: [
            {
              postTransformNode: el => {
                el.staticStyle = `$processStyle(${el.staticStyle})`
                el.styleBinding = `$processStyle(${el.styleBinding})`
              }
            }
          ]
        }
      }
    ]
  }
}
