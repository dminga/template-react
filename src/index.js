import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers'

ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
)