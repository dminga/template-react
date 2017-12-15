import React, { Component } from 'react'
import { browserHistory } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import { connect } from 'react-redux'
import { actionLogin } from '../actions'

const FieldGroup = ({id, label, help, inputRef, ...props}) => {
  return (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} inputRef={inputRef}/>
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
)}

class LoginPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirect !== '') {
      this.props.history.push(nextProps.redirect)
    }
  }

  render() {
    var isLoading = this.props.isLoading
    var hasError = (this.props.error !== '')
    return (
      <div className='card mx-auto' style={{width: '20rem'}}>
        <Form className='card-body'>
          <p >Enter your account</p>
          <FieldGroup
            id='inputUser'
            type='text'
            label='User:'
            placeholder='Enter username'
            inputRef={(ref)=>{this.inputUser=ref}}
          />
          <FieldGroup
            id='inputPass'
            type='password'
            label='Password:'
            inputRef={(ref)=>{this.inputPass=ref}}
          />
          <label
            className={
              (isLoading||hasError)?'visible ':'invisible '+
              (hasError)?', bg-danger':''+
              (isLoading)?', bg-info':''
            }
          >
          {(isLoading)?'Loading...':''}
          {(hasError)?('Error: '+this.props.error):''}
          </label>
          <Button
            className='float-right'
            bsStyle='primary'
            onClick={()=>{
              this.props.onLogin(
                this.inputUser.value,
                this.inputPass.value
              )
            }}
          >
            Log in
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    redirect: state.auth.redirect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user, password)=>(dispatch(actionLogin(user, password)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
