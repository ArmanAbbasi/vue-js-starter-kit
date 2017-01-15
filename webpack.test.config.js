let nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-3'],
                plugins: ['transform-vue-jsx', 'transform-runtime']
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: 'babel-loader!eslint-loader',
                    css: 'sass-loader'
                }
            }
        }]
    },
    devtool: 'cheap-module-source-map'
};