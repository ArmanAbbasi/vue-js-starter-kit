import webpack from 'webpack';
import base from './webpack.base.config.babel';
import HTMLPlugin from 'html-webpack-plugin';
import SWPreCachePlugin from 'sw-precache-webpack-plugin';

const client = Object.assign({}, base, {
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-client.js'
        })
    },
    plugins: (base.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"',
            'process.BROWSER': true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HTMLPlugin({
            template: 'src/views/layout/index.template.html'
        })
    ])
});

if (process.env.NODE_ENV === 'production') {
    client.plugins.push(
        new SWPreCachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
        })
    );
}

export default client;