import React, { useState } from 'react'

export default ({ dispatch }) => {
  const [task, setTask] = useState('')

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: 'ADD_TODO', task })
    }

    setTask('')

    event.preventDefault()
  }

  const handleChange = event => setTask(event.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  )
}
