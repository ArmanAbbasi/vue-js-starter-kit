const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const serialize = require('serialize-javascript');
const resolve = file => path.resolve(__dirname, file);

const MAX_CACHE_SIZE = 1000;
const MAX_CACHE_AGE_MS = 1000 * 60 * 15;
const TEMPLATE_APP_MARKET = '<app/>';
const IS_PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 8080;
const DISTRIBUTION_FOLDER = 'dist';
const BUILD_FOLDER = 'build';
const SERVER_INFO =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;
const app = express();

let generatedHtml;
let renderer;

const createRenderer = (bundle) => require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
        max: MAX_CACHE_SIZE,
        maxAge: MAX_CACHE_AGE_MS
    })
});

const parseIndex = (template) => {
    const APP_MARKER_IDX = template.indexOf(TEMPLATE_APP_MARKET);
    return {
        head: template.slice(0, APP_MARKER_IDX),
        tail: template.slice(APP_MARKER_IDX + TEMPLATE_APP_MARKET.length)
    };
};

if (IS_PROD) {
    // in production: create server renderer and index HTML from real fs
    renderer = createRenderer(fs.readFileSync(resolve(`./${DISTRIBUTION_FOLDER}/server-bundle.js`), 'utf-8'));
    generatedHtml = parseIndex(fs.readFileSync(resolve(`./${DISTRIBUTION_FOLDER}/index.html`), 'utf-8'));
} else {
    // in development: setup the dev server with watch and hot-reload,
    // and update renderer / index HTML on file change.
    require(`./${BUILD_FOLDER}/setup-dev-server`)(app, {
        bundleUpdated: bundle => {
            renderer = createRenderer(bundle);
        },
        indexUpdated: index => {
            generatedHtml = parseIndex(index);
        }
    })
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && IS_PROD ? 60 * 60 * 24 * 30 : 0
});

app.use(compression({ threshold: 0 }));
app.use('/service-worker.js', serve(`./${DISTRIBUTION_FOLDER}/service-worker.js`));
app.use(`/${DISTRIBUTION_FOLDER}`, serve(`./${DISTRIBUTION_FOLDER}`));

app.get('*', (req, res) => {
    if (!renderer) {
        return res.end('Waiting for compilation... refresh in a moment.');
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', SERVER_INFO);

    const TIME_AT_START_REQUEST = Date.now();
    const context = { url: req.url };
    const renderStream = renderer.renderToStream(context);

    renderStream.once('data', () => {
        res.write(generatedHtml.head);
    });

    renderStream.on('data', chunk => {
        res.write(chunk);
    });

    renderStream.on('end', () => {
        // Parse initial store state to global namespace
        if (context.initialState) {
            res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`);
        }
        res.end(generatedHtml.tail);
        console.log(`whole request: ${Date.now() - TIME_AT_START_REQUEST}ms`);
    });

    renderStream.on('error', err => {
        if (err && err.code === '404') {
            res.status(404).end('Page Not Found: 404');
            return;
        }

        res.status(500).end('Internal Error: 500');
        console.error(`Error during render : ${req.url}`);
        console.error(err);
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});