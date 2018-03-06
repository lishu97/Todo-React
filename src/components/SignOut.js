import React, { Component } from 'react'
import { Button } from 'antd'

export default class SignInBtn extends Component {
  handleOnClick() {
    this.props.onSignOut()
  }
  render() {
    return <Button className="signOut" onClick={ this.handleOnClick.bind(this) }>注销</Button>
  }
}