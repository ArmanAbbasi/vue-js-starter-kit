const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/client-entry.js',
        vendor: [
            'es6-promise',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ],
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            loader: 'css-loader!sass-loader',
                            fallbackLoader: 'vue-style-loader' // vue-loader dependency
                        })
                    }
                }
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }, {
                test: /\.scss/,
                exclude: /node_modules/,
                loader: 'sass-loader'
            }, {
                test: /\.js$/,
                loader: 'buble-loader',
                exclude: /node_modules/,
                options: {
                    objectAssign: 'Object.assign'
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/images/**/*',
            to: 'images',
            flatten: true
        }, {
            from: './src/data/**/*',
            to: 'data',
            flatten: true
        }]),
        new ExtractTextPlugin('main.[hash].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};