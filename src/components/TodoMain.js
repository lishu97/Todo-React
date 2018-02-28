import React from 'react'
import TodoItem from './TodoItem'

class TodoMain extends React.Component {
  render(){
    if(this.props.todos.length === 0) {
      return (
        <div className="todoEmpty">目前没有待办任务</div>
      )
    } else {
      return (
        <ul className="todoMain">
          {
            this.props.todos.map((todo,index) => {
              //{...this.props} 用来传递TodoMain的todos属性和delete、change方法。
              return <TodoItem 
                key={index}
                index={index}
                content={todo.content} 
                isDone={todo.isDone} 
                date={todo.date}
                time={todo.time}
                {...this.props} />
            })
          }
        </ul>
      )
    }
  }
}
export default TodoMain