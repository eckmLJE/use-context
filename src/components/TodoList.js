import React from 'react'

import TodoItem from './TodoItem'

export default ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
)
