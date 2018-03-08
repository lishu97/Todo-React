import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TodoItem from '../components/TodoItem'
import TodosFooter from './TodosFooter'
import { Input } from 'antd'
import { initTodos, addTodo, deleteTodo, changeDone } from '../reducers/todos'

class TodosMain extends Component {
  static propTypes = {
    username: PropTypes.string,
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
    this._inputChange = this._inputChange.bind(this)
    this._initTodos = this._initTodos.bind(this)
    this._addTodo = this._addTodo.bind(this)
    this._deleteTodo = this._deleteTodo.bind(this)
    this._changeTodo = this._changeTodo.bind(this)
  }
  componentWillMount() {
    this._initTodos()
  }
  _initTodos() {
    if(!this.props.username) {
      // 未登录
      this.props.initTodos([])
    } else {
      // 已登录
      let todos = localStorage.getItem(this.props.username)
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
      localStorage.setItem(this.props.username, newTodos)
      this.props.addTodo(todo)
      this.setState({ inputValue: '' })
    }    
  }
  _deleteTodo(index) {
    const todos = this.props.todos
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    localStorage.setItem(this.props.username, JSON.stringify(newTodos))
    this.props.deleteTodo(index)
  }
  _changeTodo(index) {
    let todos = this.props.todos
    let newTodos = [
      ...todos.slice(0, index), 
      { ...todos[index], isDone: !todos[index].isDone },
      ...todos.slice(index + 1)
    ]
    localStorage.setItem(this.props.username, JSON.stringify(newTodos))
    this.props.changeDone(index)
  }
  _inputChange(e) {
    this.setState({ inputValue: e.target.value })
  }
  render() {
    const UnsignIn = <div className="unSignIn">请在登录后使用</div>
    const TodoEmpty = <div className="todoEmpty">目前没有待办任务</div>
    const TodosItems =  <div>
                          <ul className="todosItems">
                            {this.props.todos.map((todo, index) => {
                              return (<TodoItem 
                                key={index}
                                todo={todo}
                                onChangeDone={this._changeTodo}
                                onDeleteTodo={this._deleteTodo}/>
                              )
                            })}
                          </ul>
                          <TodosFooter />
                        </div>
    if(!this.props.username) {
      return UnsignIn
    } else {
      return (
        <div className="todosMain">
          <Input className="todoInput" 
            autoFocus
            value={this.state.inputValue}
            placeholder='请输入待办事项，按回车键确认'
            onPressEnter={this._addTodo} 
            onChange={this._inputChange}
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
    username: state.username,
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