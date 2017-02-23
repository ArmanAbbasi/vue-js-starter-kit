let fs = require('fs');
let path = require('path');
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.babelrc')));

require('babel-core/register')(config);
require('../../config/setup-dev-server');
require('./server');