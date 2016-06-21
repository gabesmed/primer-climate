const redis = require('redis');
const requestProxy = require('express-request-proxy');
const url = require('url');

require('redis-streams')(redis);

const cacheClient = redis.createClient(process.env.REDIS_URL);

const server = require('./server.js')

const port = (process.env.PORT || 3000);
const calcServer = process.env.CALC_SERVER || 'localhost';
const calcPort = process.env.CALC_PORT || 9292;
const calcPath = process.env.CALC_PATH || '/serve_v22';

const app = server.app();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

var calcProxy = requestProxy({
  url: `http://${calcServer}:${calcPort}/${calcPath}/*`,
  cache: cacheClient,
  cacheMaxAge: 86400
});

app.get('/calc/*', calcProxy);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
