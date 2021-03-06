import React, { Component } from 'react'
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'
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
