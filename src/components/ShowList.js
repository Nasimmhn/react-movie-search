import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./showlist.css"

export const ShowList = () => {
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [pagination, setPagination] = useState(0)
  const [found, setFound] = useState(0)
  const [year, setYear] = useState("")
  const [listed_in, setListed_in] = useState("")

  useEffect(() => {
    fetch(`http://localhost:8080/shows?&year=${year}&page=${page}&perPage=${perPage}&listed_in=${listed_in}`)
      .then((res) => res.json())
      .then((json) => {
        setShows(json.shows)
        setPagination(Math.ceil(json.total_shows / perPage))
        setFound(json.total_shows)
      })
  }, [page, perPage, year, listed_in])

  return (
    <main className="main-container">
      <h1> Found {found} shows </h1>
      {shows.map((show) => (
        // <Show key={show.show_id} show={show} />

        <Link key={show.show_id} to={`/shows/id/${show.show_id}`}>
          <div className="show-container">
            <h1>{show.title}</h1>
            <h3>{show.listed_in}</h3>
            <p>Released: {show.release_year}</p>
          </div>
        </Link>
      ))}

      {[...Array(pagination)].map((num, page) =>
        <button key={page}
          className="pageination-btn"
          onClick={() => setPage(page + 1)}> {page + 1}
        </button>
      )}
    </main>
  )
}