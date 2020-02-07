import React from 'react'

export const Show = ({ show }) => {
  return (
    <div className="show-container">
      <h1>{show.title}</h1>
      <h3>{show.listed_in}</h3>
      <p>{show.release_year}</p>
    </div>
  )
}