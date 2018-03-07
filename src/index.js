import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todosReducer from './reducers/todos'
import TodosApp from './containers/TodosApp'
import './index.css'

const store = createStore(todosReducer)

ReactDOM.render(
  <Provider store={store}>
    <TodosApp />
  </Provider>, 
  document.querySelector('#root'))
