const webpack = require('webpack');
const base = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({}, base, {
    target: 'node',
    devtool: false,
    entry: './src/server-entry.js',
    output: Object.assign({}, base.output, {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    }),
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-server.js'
        })
    },
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'process.BROWSER': false
        })
    ]
});