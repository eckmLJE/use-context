import React from 'react'

export default ({ dispatch }) => {
  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' })
  }

  const handleShowComplete = () => {
    dispatch({ type: 'SHOW_COMPLETE' })
  }

  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' })
  }

  return (
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
  )
}
