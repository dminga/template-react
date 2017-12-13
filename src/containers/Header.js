import React, { Component } from 'react'
import UserBar from '../components/UserBar'

class Header extends Component {
  render() {
    return(
      <div className='row'>
        <span className='col-sm-10'><h1>HeaderContent</h1></span>
        <span className='col-sm-2'><UserBar /></span>
        <hr/>
      </div>
    )
  }
}

export default Header
