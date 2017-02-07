import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    target: 'node',
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/,
            options: {
                preserveWhitespace: false,
                postcss: [
                    require('autoprefixer')({
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
        }]
    },
    devtool: 'cheap-module-source-map'
};