import React, { Component } from 'react'
import TodosHeader from './TodosHeader'
import TodosMain from './TodosMain'
import TodosFooter from './TodosFooter'
import 'antd/dist/antd.css'

export default class TodosApp extends Component {
  render() {
    return (
      <div className="wraper">
        <TodosHeader />
        <TodosMain />
        <TodosFooter />
      </div>
    )
  }
}