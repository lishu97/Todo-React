import React, { Component } from 'react'

export default class SignIn extends Component {
  handleOnClick() {
    this.props.onSignIn()
  }
  render() {
    return <a href='#' className="signIn" onClick={ this.handleOnClick.bind(this) }>登录</a>
  }
}