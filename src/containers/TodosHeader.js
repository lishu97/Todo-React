import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SignInBox from './SignInBox'
import SignInBtn from '../components/SignIn'
import SignOutBtn from '../components/SignOut'
import { initUserName, initTodos, signIn, signOut } from '../reducers/todos'

// TodosHeaderContainer
// smart组件，负责登录、注销，完成TodosHeader与state的沟通
class TodosHeader extends Component {
  static propTypes = {
    userName: PropTypes.string,
    onSignIn: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this.state = {
      isShowSignInBox: false
    }
  }
  componentWillMount() {
    this._loadUserName()
    this._showSignInBox()
  }
  _loadUserName() {
    let userName = localStorage.getItem('userName')
    userName = userName ? `${userName}` : undefined
    this.props.initUserName(userName)
  }
  _showSignInBox() {
    const isSignIn = this.props.userName ? true : false
    this.setState({ isShowSignInBox: isSignIn })
  }
  handleClickSignInBtn(userName) {
    this.setState({ isShowSignInBox: true })
  }
  handleSignIn(userName) {
    localStorage.setItem('userName', userName)
    this.props.onSignIn(userName)
    let someoneTodos = localStorage.getItem(userName)
    someoneTodos = someoneTodos ? JSON.parse(someoneTodos) : []
    this.props.initTodos(someoneTodos)
  }
  handleClickSignOutBtn() {
    localStorage.removeItem('userName')
    this.props.onSignOut()
    this.props.initTodos([])
  }
  handleClickCloseBtn() {
    this.setState({ isShowSignInBox: false })
  }
  render() {
    const userName = this.props.userName
    return (
      <div className="TodosHeader">
        <h2>React-Todos</h2>
        <div className='clearfix'>
          <div className="welcome">
            {/* TODO: 如何合并字符串与组件？ */}
            欢迎你，{ userName ? userName : '请' }
            { userName ? '' : <SignInBtn onSignIn={ this.handleClickSignInBtn.bind(this) } /> }
          </div>
          { userName ? <SignOutBtn onSignOut={ this.handleClickSignOutBtn.bind(this) } /> : '' }
        </div>
        { 
          this.state.isShowSignInBox 
          ? <SignInBox onSignIn={ this.handleSignIn.bind(this) } 
            onClose={ this.handleClickCloseBtn.bind(this) }/> 
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (userName) => {
      dispatch(signIn(userName))
    },
    onSignOut: () => {
      dispatch(signOut())
    },
    initUserName: (userName) => {
      dispatch(initUserName(userName))
    },
    initTodos: (todos) => {
      dispatch(initTodos(todos))
    }
  }
}
// 将 TodosHeaderContainer connect 到 store
// 会把 state 和 dispatch 处理为 props 传给 TodosHeaderContainer
export default connect(mapStateToProps, mapDispatchToProps)(TodosHeader)