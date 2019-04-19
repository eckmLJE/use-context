import React, { useReducer, createContext } from 'react'
import uuid from 'uuid/v4'

import Filter from './components/Filter'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

const ToDoContext = createContext(null)

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
]

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, complete: true } : todo
      )
    case 'UNDO_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, complete: false } : todo
      )
    case 'ADD_TODO':
      return [...state, { task: action.task, id: uuid(), complete: false }]
    default:
      throw new Error()
  }
}

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'SHOW_COMPLETE':
      return 'COMPLETE'
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE'
    default:
      throw new Error()
  }
}

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true
    }
    if (filter === 'COMPLETE' && todo.complete) {
      return true
    }
    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true
    }
    return false
  })

  return (
    <ToDoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </ToDoContext.Provider>
  )
}

export default App
