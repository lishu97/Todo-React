import React from 'react'

export default (props) => {
  return (
    <li className="clearfix">
      <label>
        <input type="checkbox"/>
        <p className={'task' + props.isDone?' task-done':''}>
          <span className='time'>{props.date}{props.time}</span>
          <span className='content'>{props.content}</span>
        </p>
      </label>
    </li>
  )
}
