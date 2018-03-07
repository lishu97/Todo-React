import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SignInAndSignUp from '../components/SignInAndSignUp'
import SignInLink from '../components/SignInLink'
import SignOutBtn from '../components/SignOutBtn'
import { initUsername, initTodos, signIn, signOut } from '../reducers/todos'

// smart组件，负责登录、注销，完成TodosHeader与state的沟通
class TodosHeader extends Component {
  static propTypes = {
    username: PropTypes.string,
    initUsername: PropTypes.func.isRequired,
    initTodos: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.state = {
      isShowSignInAndSignUp: false
    }
    this._loadUsername = this._loadUsername.bind(this)
    this._loadSignInAndSignUp = this._loadSignInAndSignUp.bind(this)
    this._switchShowSignInAndSignUp = this._switchShowSignInAndSignUp.bind(this)
    this._signUpInLocalStorage = this._signUpInLocalStorage.bind(this)
    this.handleOnSignIn = this.handleOnSignIn.bind(this)
    this.handleOnSignOut = this.handleOnSignOut.bind(this)
  }
  componentWillMount() {
    this._loadUsername()
    this._loadSignInAndSignUp()
  }
  // 初始化用户名
  _loadUsername() {
    const username = this.props.username
    this.props.initUsername(username)
  }
  // 初始化登录框显示状态
  _loadSignInAndSignUp() {
    const isSignIn = this.props.username ? true : false
    this.setState({ isShowSignInAndSignUp: !isSignIn })
  }
  // 控制登录框的显示和关闭
  _switchShowSignInAndSignUp() {
    this.setState({ isShowSignInAndSignUp: !this.state.isShowSignInAndSignUp })
  }
  // 注册
  _signUpInLocalStorage(username, password) {
    let users = JSON.parse(localStorage.getItem('users'))
    users = users ? users : {}
    if(users[username]) {
      return alert('注册失败，用户名已存在')
    }
    users[username] = password
    localStorage.setItem('users', JSON.stringify(users))
    alert('注册成功，即将登录')
    this.handleOnSignIn(username, password)
    this._switchShowSignInAndSignUp()
  }
  // 登录
  handleOnSignIn(username, password) {
    let users = JSON.parse(localStorage.getItem('users'))
    users = users ? users : {}
    if(!users[username]) {
      return alert('用户名不存在')
    }
    if(users[username] !== password) {
      return alert('用户名与密码不匹配')
    }      
    localStorage.setItem('username', username)
    this.props.onSignIn(username)
    let someoneTodos = localStorage.getItem(username)
    someoneTodos = someoneTodos ? JSON.parse(someoneTodos) : []
    this.props.initTodos(someoneTodos)
    this._switchShowSignInAndSignUp()
  }
  // 注销
  handleOnSignOut() {
    localStorage.removeItem('username')
    this.props.onSignOut()
    this.props.initTodos([])
  }
  render() {
    const username = this.props.username
    const signIn = <span>
                     请<SignInLink onShowSignIn={this._switchShowSignInAndSignUp} />
                   </span>
    return (
      <div className="TodosHeader">
        <h2>React-Todos</h2>
        <div className='clearfix'>
          <div className="welcome">
            欢迎你，{username ? username : signIn}
          </div>
          {username ? <SignOutBtn onSignOut={this.handleOnSignOut} /> : '' }
        </div>
        {this.state.isShowSignInAndSignUp 
            ? <SignInAndSignUp onSignIn={this.handleOnSignIn} 
              onSignUp={this._signUpInLocalStorage}
              onClose={this._switchShowSignInAndSignUp} /> 
            : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username) => {
      dispatch(signIn(username))
    },
    onSignOut: () => {
      dispatch(signOut())
    },
    initUsername: (username) => {
      dispatch(initUsername(username))
    },
    initTodos: (todos) => {
      dispatch(initTodos(todos))
    }
  }
}
// 将 TodosHeaderContainer connect 到 store
// 会把 state 和 dispatch 处理为 props 传给 TodosHeaderContainer
export default connect(mapStateToProps, mapDispatchToProps)(TodosHeader)