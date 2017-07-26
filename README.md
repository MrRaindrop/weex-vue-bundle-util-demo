# weex-vue-bundle-util-demo

demo for packing weex-vue-render with weex-vue-bundle-util into a slimmer size.

## run this demo

```shell
npm install
npm run build
npm run serve
```

## intro

Use 'weex-vue-bundle-util' to pack up your own render for weex web-render 2.0 (weex-vue-render). Use the render-core as a dependency, and use 'weex-vue-bundle-util' to scan your project, which will generate a import entry file (In this demo is `./src/weex-vue-plugins.js`) and auto install the required plugins.

In this case, the finall generated render package is just **28.64kb** (gzipped), which is a lot smaller than the full version of weex-vue-render.

If you have a strict limit for your project bundle size, you should do the packing like this demo did.

你可以通过 'weex-vue-util' 来打包你自己的 web-render，代替完全版本的 'weex-vue-render'. 这样可以有效减少 render 的体积。例如本 demo 仅仅用到了 'modal' 这个模块，且没有用到其他扩展的组件，最后只需要安装一个 plugin (weex-vue-modal)，结果打出来的 render (`./dist/index.min.js.gz`) 仅仅只有 **28.64kb**. 和完全版本的 render （38.58kb）相比，减少了 25.76%.
