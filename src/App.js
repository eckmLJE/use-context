import React, { useReducer, createContext } from 'react'
import uuid from 'uuid/v4'

import AddTodo from './components/AddTodo'
import Filter from './components/Filter'
import TodoList from './components/TodoList'

export const DispatchContext = createContext(null)

const initalTodos = [
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

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'SHOW_COMPLETE':
      return 'COMPLETE'
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE'
    default:
      return state
  }
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true }
        } else {
          return todo
        }
      })
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false }
        } else {
          return todo
        }
      })
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: uuid(),
        complete: false,
      })
    default:
      return state
  }
}

const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos)

  const dispatch = action =>
    [dispatchTodos, dispatchFilter].forEach(fn => fn(action))

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
    <DispatchContext.Provider value={dispatch}>
      <Filter />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </DispatchContext.Provider>
  )
}

export default App
