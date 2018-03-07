import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SignInLink extends Component {
  static propTypes = {
    onShowSignIn: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.handleOnShowSignIn = this.handleOnShowSignIn.bind(this)
  }
  handleOnShowSignIn() {
    this.props.onShowSignIn()
  }
  render() {
    return <a href='#' className="SignInLink" onClick={this.handleOnShowSignIn}>登录</a>
  }
}