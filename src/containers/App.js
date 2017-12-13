import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import mainReducer from '../reducers'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import '../styles/bootstrap.css'

class App extends Component {
  constructor (props) {
    super(props)
    //TODO: check if state already exists in cookies or server
    this.store = createStore(
      mainReducer,
      applyMiddleware(thunk)
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Header />
          <Body />
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default App
