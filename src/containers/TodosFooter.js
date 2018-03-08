import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox, Button } from 'antd'
import { changeAllDone, deleteTodos } from '../reducers/todos'

class TodosFooter extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired,
    changeTodosDone: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      last: undefined,
      selectAll: false
    }
    this._initState.bind(this)
  }
  componentWillMount() {
    this._initState(this.props.todos)
  }
  componentWillReceiveProps(newprops) {
    this._initState(newprops.todos)
    localStorage.setItem(newprops.username, JSON.stringify(newprops.todos))
  }
  _initState(todos) {
    let flag = true
    let num = 0
    todos.forEach((todo, index) => {
      if(todo.isDone === false) {
        flag = false
        num++
      }
    })
    this.setState({ last: num, selectAll: flag })
  }
  _changeSelectAll(e) {
    this.props.changeTodosDone(!this.state.selectAll)
    this.setState({ selectAll: !this.state.selectAll}, () => {
      const todosString = JSON.stringify(this.props.todos)
      localStorage.setItem(this.props.username, todosString)
    })
  }
  _deleteCompleted(e) {
    this.props.deleteTodos()

  }
  render() {
    return (
      <div className="todosFooter">
        <span>
          <Checkbox id="selectAll" 
            checked={this.state.selectAll} 
            onChange={this._changeSelectAll.bind(this)}/>
          <label className='selectAll' htmlFor="selectAll">全部完成</label>
        </span>
        { this.state.last === 0 
          ? <span>恭喜你已全部完成</span>
          : <span>还剩{this.state.last}项未完成</span> }
        <Button type="danger" size='small'onClick={ this._deleteCompleted.bind(this) }> 清除已完成 </Button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    username: state.username,
    todos: state.todos
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeTodosDone: (isDone) => {dispatch(changeAllDone(isDone))},
    deleteTodos: () => {dispatch(deleteTodos())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodosFooter)