import React, { Component } from 'react'
import { browserHistory } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { actionLogin } from '../actions'

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class LoginPage extends Component {
  render() {
    console.log('Props: ', this.props);
    return (
      <div className='card mx-auto' style={{width: '20rem'}}>
        <Form className='card-body'>
          <p >Enter your account</p>
          <FieldGroup
            id='inputUser'
            type='text'
            label='User:'
            placeholder='Enter username'
          />
          <FieldGroup
            id='inputPass'
            type='password'
            label='Password:'
          />
          <Button
            className='float-right'
            bsStyle='primary'
            onClick={()=>{
              console.log('clicked')
              this.props.onLogin('1','2')
            }}
          >
            Log in
          </Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, password)=>(dispatch(actionLogin(user, password)))
  }
}

export default LoginPage
