import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var isLoggedIn = (this.props.user !== '')
    console.log('UserBar is logged in: ', isLoggedIn);
    console.log('Props: ', JSON.stringify(this.props));
    return (
      <div>
      <span className={isLoggedIn?'visible':'invisible'}>
      {this.props.user}
      </span>
      <Link to='/login' className={isLoggedIn?'invisible':'visible'}> Log in </Link>
      <button className={isLoggedIn?'visible':'invisible'}
      onClick={()=>(this.props.onLogOut())}> Log out </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => (dispatch(actionLogout()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBar)
