const path = require('path');
const express = require('express');

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, './index.html');
    const staticPath = express.static(path.join(__dirname, './static'));
    const distPath = express.static(path.join(__dirname, './dist'));

    const indexHandler = function (_, res) { res.sendFile(indexPath); };

    app.use('/static', staticPath);
    app.use('/dist', distPath);
    app.get('/', indexHandler);
    app.get('/play*', indexHandler);

    return app;
  }
};
