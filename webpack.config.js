var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var PrerenderSpaPlugin = require('prerender-spa-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../public_html'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {test: /\.(woff|woff2|eot|ttf)$/, loader: 'file-loader?limit=100000'}
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, "../public_html"),
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

  },
  performance: {
    hints: false
  },
  devtool: '#source-map'/*'#eval-source-map'*/
}

if (process.env.NODE_ENV === 'production') {

  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: '"production"'
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: path.resolve(__dirname, '../public_html/index.html'),
      inject: true,
      /* publicPath: '/dist/'*/
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static',
        /* ignore: ['.*']*/
      }
    ]),
   /* new PrerenderSpaPlugin(
      // Absolute path to compiled SPA
      path.resolve(__dirname, '../public_html'),
      // List of routes to prerender
      [ '/health-provider',
],
      {
        // Options

        captureAfterTime: 15000, // Wait  seconds.
        maxConcurrentRoutes: 1,
      //  renderAfterDocumentEvent: 'render-trigger',
        headless: true // Display the browser window when rendering. Useful for debugging.
      }
    ),*/
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, '../public_html'),
      // Required - Routes to render.
      routes:       ['/', '/search', '/index', '/health-provider',
        '/substance-abuse', '/buprenorphine-physicians', '/mental-health', '/health-care-centers', '/naloxone-access', '/syringe-exchange-programs', '/aa-locations', '/na-locations',
        '/city/atlanta','/city/austin','/city/chicago','/city/columbus','/city/dallas','/city/houston','/city/jersey-city','/city/los-angeles','/city/new-york','/city/philadelphia','/city/san-antonio','/city/san-diego','/city/san-francisco','/city/washington-dc'],
      renderer: new PuppeteerRenderer({
        // Optional - The name of the property to add to the window object with the contents of `inject`.
      //  injectProperty: '__PRERENDER_INJECTED',
        // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
      /*  inject: {
          foo: 'bar'
        },*/

        // Optional - defaults to 0, no limit.
        // Routes are rendered asynchronously.
        // Use this to limit the number of routes rendered in paralell.
        maxConcurrentRoutes: 0,

        // Optional - Wait to render until the specified event is dispatched on the document.
        // eg, with `document.dispatchEvent(new Event('custom-render-trigger'))`
     /*   renderAfterDocumentEvent: 'render-trigger',*/

        // Optional - Wait to render until a certain amount of time has passed.
        // NOT RECOMMENDED
        renderAfterTime: 11000, // Wait 5 seconds.

        // Other puppeteer options.
        // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
      // headless: false // Display the browser window when rendering. Useful for debugging.
      }),
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',

      Popper: ['popper.js', 'default']
    })
  ])
}
