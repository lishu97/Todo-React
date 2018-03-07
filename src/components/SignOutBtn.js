import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

export default class SignOutBtn extends Component {
  static propTypes = {
    onSignOut: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.handleOnSignOut = this.handleOnSignOut.bind(this)
  }
  handleOnSignOut() {
    this.props.onSignOut()
  }
  render() {
    return <Button className="signOut" onClick={this.handleOnSignOut}>注销</Button>
  }
}