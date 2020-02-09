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
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetch(`http://localhost:8080/shows?&year=${year}&page=${page}&perPage=${perPage}&listed_in=${listed_in}&title=${title}`)
      .then((res) => res.json())
      .then((json) => {
        setShows(json.shows)
        setPagination(Math.ceil(json.total_shows / perPage))
        setFound(json.total_shows)
      })
  }, [page, perPage, year, listed_in, title])

  return (
    <>
      <header>
        <nav>
          <div className="search-box">
            <div>
              <label htmlFor="search">Title:
                <input name="search" type="text" />
              </label>
              <input type="submit" value="Search" onClick={(e) => { setTitle(e.target.previousSibling.children[0].value); setPage(1) }} />
            </div>
            <div>
              <label htmlFor="year">Year:
                <select name="year" onChange={(e) => { setYear(e.target.value); setPage(1) }}>
                  <option defaultValue value="">ALL</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2009">2008</option>
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="genre">Genre:
                <select name="genre" onChange={(e) => { setListed_in(e.target.value); setPage(1) }}>
                  <option defaultValue value="">ALL</option>
                  <option value="action|adventure">Action & Adventure</option>
                  <option value="comedies|stand-up">Comedy</option>
                  <option value="dramas">Drama</option>
                  <option value="docuseries|documentaries">Documentary</option>
                  <option value="sci-fi|fantasy">Sci-Fi & Fantasy</option>
                  <option value="thrillers">Thriller</option>
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="perPage">results per page:
                <select name="perPage" onChange={(e) => { setPerPage(e.target.value); setPage(1) }}>
                  <option defaultValue value="20">20</option>
                  <option value="100">100</option>
                  <option value="10">10</option>

                  <option value="5">5</option>
                </select>
              </label>
            </div>


          </div>
        </nav>
      </header>


      <main className="main-container">
        <div className="found"> {found} found </div>
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

      </main>
      <div className="pagination-container">
        {[...Array(pagination)].map((num, page) =>
          <button key={page}
            className="pagination-btn"
            onClick={() => setPage(page + 1)}> {page + 1}
          </button>
        )}
      </div>
    </>
  )
}