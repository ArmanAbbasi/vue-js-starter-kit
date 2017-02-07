import webpack from 'webpack';
import base from './webpack.base.config.babel';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { dependencies } from '../../package.json';

const server = Object.assign({}, base, {
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
    externals: Object.keys(dependencies),
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'process.BROWSER': false
        })
    ]
});

export default server;