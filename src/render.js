import weex from 'weex-vue-render/dist/index.core'
import plugins from './weex-vue-plugins'

plugins.forEach(function (plugin) {
  weex.install(plugin)
})

weex.init()
