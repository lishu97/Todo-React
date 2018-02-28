import React, { Component } from 'react'

export default class SignInBtn extends Component {
  handleOnClick() {
    
  }
  render() {
    return <button className="signOut" onClick={ this.handleOnClick.bind(this) }>注销</button>
  }
}