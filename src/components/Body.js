import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Body extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        Body:
        <p/>
        <div>
          <input ref={(ref)=>(this.input = ref)} defaultValue='Input something'/>
          <button onClick={()=>{this.props.btn0(this.input.value)}}> Action0 </button>
          Value0: {this.props.value0}
        </div>
        <p/>
        <div>
          <button onClick={()=>{this.props.btn1(this.props.counter1)}}> Action1 </button>
          Counter1: {this.props.counter1}
          <div className={this.props.isLoading?'visible':'invisible'}>Loading...</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    value0: state.state0.value,
    counter1: state.state1.value,
    isLoading: state.state1.isLoading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    btn0: (value) => { dispatch(actions.action0(value)) },
    btn1: (value) => { dispatch(actions.action1Async(value)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
