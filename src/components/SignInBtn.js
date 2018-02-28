import React, { Component } from 'react'

export default class SignInBtn extends Component {
  handleOnClick() {
    
  }
  render() {
    return <a href='#' onClick={this.handleOnClick.bind(this)}>登录</a>
  }
}