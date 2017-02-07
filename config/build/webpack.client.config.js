const webpack = require('webpack');
const base = require('./webpack.base.config');
const HTMLPlugin = require('html-webpack-plugin');
const SWPreCachePlugin = require('sw-precache-webpack-plugin');

const config = Object.assign({}, base, {
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-client.js'
        })
    },
    plugins: (base.plugins || []).concat([
        // strip comments in Vue code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
            'process.BROWSER': true
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // generate output HTML
        new HTMLPlugin({
            template: 'src/index.template.html'
        })
    ])
});

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new SWPreCachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    );
}

module.exports = config;