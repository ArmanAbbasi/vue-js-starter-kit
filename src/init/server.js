import fs from 'fs';
import express from 'express';
import compression from 'compression';
import staticAsset from 'static-asset';
import zLib from 'zlib';
import serialize from 'serialize-javascript';
import lruCache from 'lru-cache';
import { resolve } from 'path';
import { createBundleRenderer } from 'vue-server-renderer';

import devServer from '../../config/build/setup-dev-server';

const MAX_CACHE_SIZE = 1000;
const MAX_CACHE_AGE_MS = 1000 * 60 * 15;

const ONE_YEAR_IN_MILLIS = 31557600000;
const APP_PORT_NUM = process.env.PORT || 3000;

const TEMPLATE_APP_MARKET = '<app/>';
const IS_PROD = process.env.NODE_ENV === 'production';

const DISTRIBUTION_FOLDER = 'dist';

const app = express();

let generatedHtml;
let renderer;

const vueJsServerRenderer = (bundle) => createBundleRenderer(bundle, {
    cache: lruCache({
        max: MAX_CACHE_SIZE,
        maxAge: MAX_CACHE_AGE_MS
    })
});

const findPlaceholderInTemplateAndReplace = (template) => {
    const APP_MARKER_IDX = template.indexOf(TEMPLATE_APP_MARKET);
    return {
        head: template.slice(0, APP_MARKER_IDX),
        tail: template.slice(APP_MARKER_IDX + TEMPLATE_APP_MARKET.length)
    };
};

if (IS_PROD) {
    renderer = vueJsServerRenderer(fs.readFileSync(resolve(`./${DISTRIBUTION_FOLDER}/server-bundle.js`), 'utf-8'));
    generatedHtml = findPlaceholderInTemplateAndReplace(fs.readFileSync(resolve(`./${DISTRIBUTION_FOLDER}/index.html`), 'utf-8'));
} else {
    devServer(app, {
        bundleUpdated: bundle => {
            renderer = vueJsServerRenderer(bundle);
        },
        indexUpdated: index => {
            generatedHtml = findPlaceholderInTemplateAndReplace(index);
        }
    })
}

/**
 * Making it easier for our app to find the views
 * */
app.set('views', __dirname + '/views');

/**
 * Gzip compression is a must
 * */
app.use(compression({
    threshold: 0,
    level: zLib.Z_BEST_COMPRESSION
}));

/**
 * Indicating our static folder and setting caching duration
 * */
app.use(`/${DISTRIBUTION_FOLDER}`, staticAsset(resolve(__dirname) + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(`/${DISTRIBUTION_FOLDER}`, express.static(resolve(__dirname) + '/dist/', { maxAge: ONE_YEAR_IN_MILLIS }));
app.use('/service-worker.js', express.static((`./${DISTRIBUTION_FOLDER}/service-worker.js`)));

/**
 * Do following with all incoming GET requests
 * */
app.get('*', (req, res) => {
    if (!renderer) { return res.end('Waiting for compilation... refresh in a moment.'); }
    const context = { url: req.url };
    const renderStream = renderer.renderToStream(context);

    res.setHeader('Content-Type', 'text/html');

    renderStream.once('data', () => {
        res.write(generatedHtml.head);
    });

    renderStream.on('data', chunk => {
        res.write(chunk);
    });

    renderStream.on('end', () => {
        if (context.initialState) {
            res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`);
        }
        res.end(generatedHtml.tail);
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

/**
 * Run app at port
 * */
app.listen(APP_PORT_NUM, () => console.log(`Server running at http://localhost:${APP_PORT_NUM}`));