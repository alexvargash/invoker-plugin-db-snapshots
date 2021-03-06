let mix = require('laravel-mix')

mix
  .setPublicPath('dist')
  .ts('resources/js/main.ts', 'js')
  .ts('resources/js/renderer.ts', 'js')

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js/components/')
    }
  }
});

mix.webpackConfig({
  target: "electron-main",
  output: {
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})
