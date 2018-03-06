import React, {Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'

export default class SignInBox extends Component {
  static propTypes = {
    onSignIn: PropTypes.func,
    onSignUp: PropTypes.func,
    onClose: PropTypes.func
  }
  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }
  componentDidMount() {
    this.input.focus()
  }
  handleUserNameChange(event) {
    this.setState({ userName: event.target.value })
  }
  handleOnSignIn() {
    const userName = this.input.input.value
    if(userName === '') { return false }
    this.props.onSignIn && this.props.onSignIn(userName)
    this.props.onClose && this.props.onClose()
  }
  handleOnSignUp() {
    this.props.onSignUp && this.props.onSignUp()
  }
  handleOnClose() {
    this.props.onClose && this.props.onClose()
  }
  render() {
    return (
      <div className="signInBox">
        <div className="container">
          <Button className='closeBtn' onClick={this.handleOnClose.bind(this)}>✖</Button>
          <Input value={this.state.userName} 
            placeholder='请输入用户名'
            ref={(input) => { this.input = input }}
            onChange={this.handleUserNameChange.bind(this)}
            onPressEnter={this.handleOnSignIn.bind(this)} />
          <div className="footer">
            <Button type='primary' onClick={this.handleOnSignIn.bind(this)} >登录</Button>
            <Button onClick={this.handleOnSignUp.bind(this)}>注册</Button>
          </div>
        </div>
      </div>
    )
  }
}