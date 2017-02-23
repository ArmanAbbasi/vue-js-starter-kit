import path from 'path';
import webpack from 'webpack';
import clientConfig from './webpack.client.config.babel.js';
import serverConfig from './webpack.server.config.babel.js';
import MemoryFs from 'memory-fs';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const server = (app, opts) => {
    // modify client config to work with hot middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';

    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

    // dev middleware
    const clientCompiler = webpack(clientConfig);

    const devMiddleware = webpackMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    });

    app.use(devMiddleware);

    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem;
        const filePath = path.join(clientConfig.output.path, 'index.html');
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8');
            opts.indexUpdated(index);
        }
    });

    // hot middleware
    app.use(webpackHotMiddleware(clientCompiler));

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    const memoryFs = new MemoryFs();
    const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename);
    serverCompiler.outputFileSystem = memoryFs;

    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        opts.bundleUpdated(memoryFs.readFileSync(outputPath, 'utf-8'));
    });
};

export default server;