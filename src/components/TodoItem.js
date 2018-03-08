import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'antd'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    onChangeDone: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
  }
  constructor() {
    super()
    this._mouseOver = this._mouseOver.bind(this)
    this._mouseOut = this._mouseOut.bind(this)
    this.handleOnChangeDone = this.handleOnChangeDone.bind(this)
    this.handleOnDeleteTodo = this.handleOnDeleteTodo.bind(this)
  }
  _mouseOver() {
    ReactDOM.findDOMNode(this.refs.delButton) 
      .style.display = 'inline-block'
  }
  _mouseOut() {
    ReactDOM.findDOMNode(this.refs.delButton)
      .style.display = 'none'
  }
  handleOnChangeDone() {
    const parentNode = this.refs.todoItem.parentNode
    const childNode = this.refs.todoItem
    this.props.onChangeDone(indexOfChild(parentNode, childNode))
  }
  handleOnDeleteTodo() {
    const parentNode = this.refs.todoItem.parentNode
    const childNode = this.refs.todoItem
    this.props.onDeleteTodo(indexOfChild(parentNode, childNode))
  }
  render() {
    const todo = this.props.todo
    return (
      <li className="clearfix TodoItem" 
        ref='todoItem'
        onMouseOver={this._mouseOver}
        onMouseOut={this._mouseOut}>
        <div>
          <Checkbox checked={this.props.todo.isDone}
            onClick={this.handleOnChangeDone} />
          <p className='time'>{todo.date}{todo.time}</p>
          <Button type="danger" 
            size="small"
            onClick={this.handleOnDeleteTodo}
            ref='delButton'>删除</Button>
        </div>
        <p className='content'>{todo.content}</p>
      </li>
    )
  }
}

function indexOfChild(parentNode, childNode) {
  let index = -1
  parentNode.childNodes.forEach((node, i) => {
    if(node === childNode) {
      index = i
      return null
    }
  })
  return index
}