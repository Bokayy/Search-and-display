module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  transpileDependencies: ['pkc-common'],
  filenameHashing: false, // disable hashes in filenames
  pages: {
    standalone: {
      entry: 'src/main.js', // used for development and standalone build
      filename: 'index.html'
    },
    app: {
      entry: 'src/izzi.js', // used for IZZI build to be used in Shell
      filename: 'app.html'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks'); // no chunks, single file output

    // base64 encode images
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 70240 }));






    // base64 encode SVGs
    const svgRule = config.module.rule('svg');

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear();

    // add replacement loader(s)
    svgRule
      .use('url-loader')
      .loader('url-loader');



    // translations
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end();




    // prepend and append JS to final bundle

    // use this if you need to localize the component
    // let fs = require('fs')
    // let path = require('path')
    // let filePath = path.join(__dirname, './src/locale/locale-hr.js')
    // let fileContent = fs.readFileSync(filePath, 'utf8')
    // use this if you need to localize the component


    config
      .plugin('wrapper-webpack-plugin')
      .use(require('wrapper-webpack-plugin'), [{
        test: /\.js$/, // only wrap output of bundle files with '.js' extension 
        // header: fileContent,
        footer: 'Vue.component(\'pkc-name\', window[\'pkc-name\'])' // append component registration line to end of webpack bundle
      }]);

  }
};