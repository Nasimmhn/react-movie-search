import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export const ShowList = () => {
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState(3)
  const [year, setYear] = useState("")
  const [listed_in, setListed_in] = useState("")
  // const [page, setPage] = useState(1)


  useEffect(() => {
    fetch(`http://localhost:8080/shows?&year=${year}&page=${page}&listed_in=${listed_in}`)
      .then((res) => res.json())
      .then((json) => setShows(json))
  }, [page])

  return (
    <main className="main-container">
      {shows.map((show) => (
        // <Show key={show.show_id} show={show} />

        <Link key={show.show_id} to={`/shows/id/${show.show_id}`}>
          <div className="show-container">
            <h1>{show.title}</h1>
            <h3>{show.listed_in}</h3>
            <p>{show.release_year}</p>
          </div>
        </Link>
      ))}

      <button onClick={() => setPage(1)}> 1 </button> <button onClick={() => setPage(2)}>> 2 </button>
    </main>
  )
}















// import React from 'react'

// export const Show = ({ show }) => {
//   return (
//     <div className="show-container">
//       <h1>{show.title}</h1>
//       <h3>{show.listed_in}</h3>
//       <p>{show.release_year}</p>
//     </div>
//   )
// }