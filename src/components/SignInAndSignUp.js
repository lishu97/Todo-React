import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'antd'

export default class SignInAndSignUp extends Component {
  static propTypes = {
    // 外部传入函数全部以“on”开头
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      alert: ''
    }
    // 全部在初始化中 bind(this)
    this._usernameChange = this._usernameChange.bind(this)
    this._passwordChange = this._passwordChange.bind(this)
    this.handleOnSignIn = this.handleOnSignIn.bind(this)
    this.handleOnSignUp = this.handleOnSignUp.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
  }
  componentDidMount() {
    this.refs.username.focus()
  }
  // 内部私有方法以“_”开头
  _usernameChange(event) {
    this.setState({ username: event.target.value })
  }
  _passwordChange(event) {
    this.setState({ password: event.target.value })
  }
  // 所有处理外部关联事件以“handleOn”开头
  handleOnSignIn() {
    // refs全部使用<element ref='xxx' />格式
    const username = this.refs.username.props.value
    const password = this.refs.password.props.value
    if(username === '') { 
      return alert('请输入用户名')
    }
    if(password === '') {
      return alert('请输入密码')
    }
    this.props.onSignIn(username, password)
  }
  handleOnSignUp() {
    const username = this.refs.username.props.value
    const password = this.refs.password.props.value
    if(username === '') { 
      return alert('请输入用户名')
    }
    if(password === '') {
      return alert('请输入密码')
    }
    this.props.onSignUp(username, password)
  }
  handleOnClose() {
    this.props.onClose()
  }
  render() {
    const alert = '提示：' + this.state.alert
    return (
      <div className="SignInAndSignUp mask">
        <div className="box">
          <Button className='closeBtn' onClick={this.handleOnClose}>✖</Button>
          <p className='tip'>{this.state.alert ? alert : ''}</p>
          <Input className='username'
            value={this.state.username} 
            placeholder='请输入用户名'
            ref='username'
            onChange={this._usernameChange} />
          <Input className='password'
            type='password'
            value={this.state.password}
            placeholder='请输入密码'
            ref='password'
            onChange={this._passwordChange}
            onPressEnter={this.handleOnSignIn} />          
          <div className="bottom">
            <Button type='primary' onClick={this.handleOnSignIn} >登录</Button>
            <Button onClick={this.handleOnSignUp}>注册</Button>
          </div>
        </div>
      </div>
    )
  }
}