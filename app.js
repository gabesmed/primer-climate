const expressHttpProxy = require('express-http-proxy');
const url = require('url');

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

var calcProxy = expressHttpProxy(calcServer, {
  port: calcPort,
  forwardPath: function(req, res) {
    return calcPath + url.parse(req.url).path;
  }
});

app.use('/calc', calcProxy);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
