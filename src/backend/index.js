import express from 'express';
import bodyParser from 'body-parser'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../containers/App'
import apiRouter from './api'

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', apiRouter)

app.use('/', (req, res) => {
    const context = {};
    const componentHTML = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );
    if (context.url) {
      return res.redirect(301, context.url);
    } else {
      return res.end(renderHTML(componentHTML));
    }
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8081' : '/';

function renderHTML(componentHTML) {
  return `
  <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ReactApp</title>
          <!--<link rel="stylesheet" href="${assetUrl}/assets/styles.css">-->
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/assets/bundle.js"></script>
      </body>
    </html>
    `;
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Server listening on port %d', PORT);
});
