import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoPreFixer from 'autoprefixer';

const base = {
    devtool: 'source-map',
    entry: {
        app: './src/init/client-entry.js',
        vendor: [
            'es6-promise',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'config': path.resolve(__dirname),
            'dist': path.resolve(__dirname, '../dist'),
            'components': path.resolve(__dirname, '../src/components'),
            'views': path.resolve(__dirname, '../src/views'),
            'base': path.resolve(__dirname, '../')
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
                    autoPreFixer({
                        browsers: [
                            'last 3 versions'
                        ]
                    })
                ],
                loaders: {
                    sass: ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            'sass-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    'es2015',
                    'stage-3'
                ]
            }
        }, {
            test: /global\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }),
            exclude: /node_modules/
        }],
        noParse: /es6-promise\.js$/
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
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
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

export default base;