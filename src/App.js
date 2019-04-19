import React, { useState, useReducer } from 'react'
import uuid from 'uuid/v4'

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
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  const [task, setTask] = useState('')

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

  const handleChangeInput = e => {
    const changeValue = e.target.value
    console.log(changeValue)
    setTask(changeValue)
  }

  const handleChangeCheckbox = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    })
  }

  const handleSubmit = e => {
    if (task) {
      dispatchTodos({ type: 'ADD_TODO', task })
    }

    setTask('')
    e.preventDefault()
  }

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' })
  }

  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' })
  }

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' })
  }

  return (
    <div>
      <div>
        <button type="button" onClick={handleShowAll}>
          Show All
        </button>
        <button type="button" onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type="button" onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default App
