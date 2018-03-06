import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TodoItem from '../components/TodoItem'
import { Input } from 'antd'
import { initTodos, addTodo, deleteTodo, changeDone } from '../reducers/todos'

class TodosMain extends Component {
  static propTypes = {
    userName: PropTypes.string,
    todos: PropTypes.array,
    initTodos: PropTypes.func,
    addTodo: PropTypes.func,
    changeDone: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.handleChangeDone = this.handleChangeDone.bind(this)
  }
  componentWillMount() {
    if(!this.props.userName) {
      // 未登录
      this.props.initTodos([])
    } else {
      // 已登录
      let todos = localStorage.getItem(this.props.userName)
      todos = todos ? JSON.parse(todos) : []
      this.props.initTodos(todos)
    }
  }
  _addTodo(e) {
    if(e.target.value) {
      const { date, time } = getTime()
      const content = e.target.value
      const isDone = false
      const todo = { date, time, content, isDone }
      let newTodos = [ ...this.props.todos, todo ]  
      newTodos = JSON.stringify(newTodos)
      localStorage.setItem(this.props.userName, newTodos)
      this.props.addTodo(todo)
      this.setState({ inputValue: '' })
    }    
  }
  _deleteTodo(index) {
    const todos = this.props.todos
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    localStorage.setItem(this.props.userName, JSON.stringify(newTodos))
    this.props.deleteTodo(index)
  }
  _changeTodo(index) {
    // const todos = JSON.parse(localStorage.getItem(this.props.userName))
    let todos = this.props.todos
    let newTodos = [
      ...todos.slice(0, index), 
      { ...todos[index], isDone: !todos[index].isDone },
      ...todos.slice(index + 1)
    ]
    localStorage.setItem(this.props.userName, JSON.stringify(newTodos))
    this.props.changeDone(index)
  }
  handleChangeDone(index) {
    this._changeTodo(index)
  }
  handleDelete(index) {
    this._deleteTodo(index)
  }
  handleInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }
  render() {
    const UnSignIn = <div className="unSignIn">请在登录后使用</div>
    const TodoEmpty = <div className="todoEmpty">目前没有待办任务</div>
    const TodosItems =  <ul className="todosItems">
                          {this.props.todos.map((todo, index) => {
                            return (<TodoItem 
                              key={index}
                              todo={todo}
                              changeDone={this.handleChangeDone.bind(this)}
                              delete={this.handleDelete.bind(this)}/>
                            )
                          })}
                        </ul>
    if(!this.props.userName) {
      return UnSignIn
    } else {
      // FIXME:无法输入
      return (
        <div className="todosMain">
          <Input className="todoInput" 
            autoFocus
            value={this.state.inputValue}
            placeholder='请输入待办事项，按回车键确认'
            onPressEnter={this._addTodo.bind(this)} 
            onChange={this.handleInputChange.bind(this)}
            ref='input' />
          { 
            this.props.todos.length === 0 
            ? TodoEmpty
            : TodosItems
          }
        </div>
      )
    }
  }
}
function getTime(){
    const date = new Date()
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
const mapStateToProps = (state) => {
  return {
    userName: state.userName,
    todos: state.todos
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    initTodos: (state) => { dispatch(initTodos(state)) },
    addTodo: (todo) => { dispatch(addTodo(todo)) },
    deleteTodo: (todoIndex) => { dispatch(deleteTodo(todoIndex)) },
    changeDone: (todoIndex) => { dispatch(changeDone(todoIndex)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosMain)