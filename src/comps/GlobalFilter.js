import React from 'react'

export const GlobalFilter = ({filter, setFilter}) => {
  return (
    <span>
      <strong>Search:</strong> {' '}
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}

export default GlobalFilter