import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'antd'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    changeDone: PropTypes.func,
    delete: PropTypes.func
  }
  handleChangeDone() {
    const parentNode = this.refs.todoItem.parentNode
    const childNode = this.refs.todoItem
    this.props.changeDone(indexOfChild(parentNode, childNode))
  }
  handleDelete() {
    const parentNode = this.refs.todoItem.parentNode
    const childNode = this.refs.todoItem
    this.props.delete(indexOfChild(parentNode, childNode))
  }
  handleMouseIn() {
    ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block'
  }
  handleMouseOut() {
    ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none'
  }
  render() {
    const todo = this.props.todo
    return (
      <li className="clearfix" 
        ref='todoItem'
        onMouseOver={this.handleMouseIn.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}>
        {/*使用label*/}
        <div>
          <Checkbox checked={this.props.todo.isDone}
            onClick={this.handleChangeDone.bind(this)} />
          <p className='time'>{todo.date}{todo.time}</p>
          <Button type="danger" 
            size="small"
            onClick={this.handleDelete.bind(this)}
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
      return 
    }
  })
  return index
}