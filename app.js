const _ = require('lodash');
const expressHttpProxy = require('express-http-proxy');
const memjs = require('memjs');
const url = require('url');
const zlib = require('zlib');

const server = require('./server.js');

const port = (process.env.PORT || 4000);
const cacheDuration = 86400;
const calcServer = process.env.CALC_SERVER || 'localhost';
const calcPort = process.env.CALC_PORT || 9292;
const calcPath = process.env.CALC_PATH || '/serve_v22';

const app = server.app();
const cache = memjs.Client.create();

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

/**
 * Retrieve from cache.
 */
const cacheMiddleware = function (req, res, next) {
  cache.get(req.path, function (err, cached) {
    if (cached) {
      console.log('cache hit', req.path);
      res.append('cache-control', 'max-age=' + cacheDuration);
      res.append('content-type', 'application/json');
      res.append('content-encoding', 'gzip');
      res.status(200).send(cached);
      return;
    }
    console.log('cache miss', req.path);
    next();
  });
};

/**
 * Proxy to global calculator
 */
const calcProxy = expressHttpProxy(calcServer, {
  port: calcPort,
  intercept: function (rsp, data, req, res, callback) {
    var str = zlib.gunzipSync(data).toString('utf8');
    var obj = JSON.parse(str)[0];
    var picked = _.pick(obj, 'dashboard');
    var pickedJson = JSON.stringify([picked], null, '  ');
    var out = zlib.gzipSync(pickedJson);
    cache.set(req.path, out, null, cacheDuration);
    callback(null, out);
  },
  forwardPath: function(req, res) {
    return calcPath + url.parse(req.url).path;
  }
});


app.use('/calc', /* cacheMiddleware, */ calcProxy);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
