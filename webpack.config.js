const PROD_PATH = '/dist';
const OUTPUT_PATH = require('path').resolve(__dirname, '.' + PROD_PATH);

let Webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlMinifierPlugin = require('html-minifier-webpack-plugin');

module.exports = {
    entry: ['./src/main.js'],

    output: {
        path: OUTPUT_PATH,
        publicPath: PROD_PATH,
        filename: 'build.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-3'],
                plugins: ['transform-vue-jsx', 'transform-runtime']
            }
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
        }, {
            test: /\.html$/,
            loaders: ['file-loader?name=[name].html', 'extract-loader', 'html-loader']
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: /node_modules/,
            loader: 'file-loader',
            query: {
                name: 'file?name=[path][name].[ext]?[hash]&context=./dist'
            }
        }, {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader!eslint-loader',
                    css: 'sass-loader'
                }
            }
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: './src/images/**/*',
            to: 'images',
            flatten: true
        }]),
        new HtmlMinifierPlugin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },

    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';

  module.exports.plugins = (module.exports.plugins || []).concat([
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}