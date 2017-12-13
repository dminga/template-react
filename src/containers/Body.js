import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomePage from '../components/WelcomePage'
import LoginPage from '../components/LoginPage'

class Body extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          <Route component={WelcomePage}/>
        </Switch>
      </div>
    )
  }
}
 export default Body
