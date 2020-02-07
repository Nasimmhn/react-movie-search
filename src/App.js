import React, { useState, useEffect } from 'react'
import { Show } from 'components/Show'

export const App = () => {
  const [shows, setShows] = useState([])
  const page = 1
  const year = ""
  const listed_in = ""

  useEffect(() => {
    fetch(`http://localhost:8080/shows?&year=${year}&page=${page}&listed_in=${listed_in}`)
      .then((res) => res.json())
      .then((json) => setShows(json))
  }, [shows])
  return (
    <div className="main-container">
      {shows.map((show) => (
        <Show key={show.show_id} show={show} />

      ))}
    </div>
  )
}
