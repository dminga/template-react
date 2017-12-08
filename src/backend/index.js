import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../containers/App'

const app = express()

app.use((req, res) => {
    const componentHTML = ReactDOMServer.renderToString(<App />)
    return res.end(renderHTML(componentHTML))
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8081' : '/'
const bundleName  = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js'

function renderHTML(componentHTML) {
  return `
  <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>ReactApp_Isomorphic</title>
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/assets/${bundleName}"></script>
      </body>
    </html>
    `
}

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Server listening on port %d', PORT)
})
