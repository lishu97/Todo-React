import React, { Component } from 'react'
import TodoMain from './TodoMain'
import SignInBtn from './SignInBtn'
import SignOutBtn from './SignOutBtn'
import './TodosAppStyle.css'

export default class TodosApp extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      userName: undefined,
      // userName: 'undefind',
      isAllDone: false
    }
  }
  _addTodo(content) {
    const { todos } = this.state
    const todo = {
        ...timeTrans(new Date()),
        content: content,
        isDone: false
    }
    this.setState({ todos: [...todos, todo] })
  }
  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this._addTodo(e.target.value)
      e.target.value = ''
    }
  }
  render() {
    const userName = this.state.userName
    return (
      <div className="TodosApp">
        <h1 className="header">React-Todos</h1>
        <div className='clearfix'>
          <span className="welcome">
            欢迎你，{ userName ? userName : '请' }{ userName ? userName : <SignInBtn /> }
          </span>
          { userName ? <SignOutBtn /> : '' }
        </div>
        <input className="input" type="text" 
          placeholder="请输入你的任务名称，按回车确认" 
          onKeyUp={ this.handleKeyUp.bind(this) } />
        <TodoMain todos={this.state.todos} />
      </div>
    )
  }
}

function timeTrans(date){
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return {
      date: Y+M+D,
      time: h+m+s
    }
}