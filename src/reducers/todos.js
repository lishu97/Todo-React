// action types
const INIT_TODOS = 'INIT_TODOS'
const INIT_USERNAME = 'INIT_USERNAME'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS'
const CHANGE_DONE = 'CHANGE_DONE'
const CHANGE_ALL_DONE = 'CHANGE_ALL_DONE'
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGH_OUT'

// reducer
export default function(state, action) {
  if(!state) {
    state = {
      userName: undefined,
      todos: []
    }
  }
  switch (action.type) {
    case INIT_TODOS:
      // 初始化todos
      return { 
        ...state,
        todos: [...action.todos ]
      }
    case INIT_USERNAME:
      // 初始化username
      return { 
        ...state,
        userName: action.userName
      }
    case ADD_TODO:
      // 添加
      return { 
        ...state,
        todos: [
          ...state.todos,
          action.todo
        ]
      } 
    case DELETE_TODO:
      // 删除
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.todoIndex),
          ...state.todos.slice(action.todoIndex + 1)
        ]
      }
    case DELETE_ALL_TODOS:
    // 删除已完成
      const lastTodos = []
      state.todos.map((todo, index) => {
        if(!todo.isDone) {
          lastTodos.push(todo)
        }
        return null
      })
      console.log(lastTodos)
      return {...state, todos: lastTodos }
    case CHANGE_DONE:
      // 修改
      const preTodo = state.todos[action.todoIndex]
      const newTodo = {
        ...preTodo,
        isDone: !preTodo.isDone
      }
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.todoIndex),
          newTodo,
          ...state.todos.slice(action.todoIndex + 1)
        ]
      }
    case CHANGE_ALL_DONE:
      // 修改全部
      const newTodos = state.todos.map((todo, index) => {
        const newTodo = {
          ...todo,
          isDone: action.isDone
        }
        return newTodo
      })
      return {...state, todos: newTodos }
    case SIGN_IN:
      // 登录
      return {
        ...state,
        userName: action.userName
      }
    case SIGN_OUT:
      // 注销
      return {
        ...state,
        userName: ''
      }
    default:
      // 不接受其他操作
      return state
  }
}

// action creators
export const initTodos = (todos) => {
  return { type: INIT_TODOS, todos: todos }
}
export const initUserName = (userName) => {
  return { type: INIT_USERNAME, userName: userName }
}
export const addTodo = (todo) => {
  return { type: ADD_TODO, todo: todo}
}
export const deleteTodo = (todoIndex) => {
  return { type: DELETE_TODO, todoIndex: todoIndex}
}
export const deleteAllTodos = () => {
  return { type: DELETE_ALL_TODOS}
}
export const changeDone = (todoIndex) => {
  return { type: CHANGE_DONE, todoIndex: todoIndex}
}
export const changeAllDone = (isDone) => {
  return { type: CHANGE_ALL_DONE, isDone: isDone}
}
export const signIn = (userName) => {
  return { type: SIGN_IN, userName: userName}
}
export const signOut = (userName) => {
  return { type: SIGN_OUT, userName: userName}
}