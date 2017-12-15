import React, { Component } from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import '../styles/bootstrap.css'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}

export default App
