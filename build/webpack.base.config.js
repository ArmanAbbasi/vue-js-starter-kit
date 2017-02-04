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
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/,
            options: {
                preserveWhitespace: false,
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 3 versions']
                    })
                ],
                loaders: {
                    sass: ExtractTextPlugin.extract({
                        use: 'css-loader!sass-loader',
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-3']
            }
        }, {
            test: /global\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader!postcss-loader!sass-loader'
            }),
            exclude: /node_modules/
        }],
        noParse: /es6-promise\.js$/ // avoid webpack shimming process
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
        new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
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