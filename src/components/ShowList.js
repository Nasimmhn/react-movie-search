import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Loader from 'react-loader-spinner'
import "./showlist.css"
import { API_URL } from '../App'

export const ShowList = () => {

  if (!(sessionStorage.getItem('page'))) { sessionStorage.setItem('page', 1) }
  if (!(sessionStorage.getItem('perPage'))) { sessionStorage.setItem('perPage', 20) }
  if (!(sessionStorage.getItem('year'))) { sessionStorage.setItem('year', "") }
  if (!(sessionStorage.getItem('listed_in'))) { sessionStorage.setItem('listed_in', "") }
  if (!(sessionStorage.getItem('title'))) { sessionStorage.setItem('title', "") }


  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('')
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(sessionStorage.getItem('page'))
  const [perPage, setPerPage] = useState(sessionStorage.getItem('perPage'))
  const [pagination, setPagination] = useState(0)
  const [found, setFound] = useState(0)
  const [year, setYear] = useState(sessionStorage.getItem('year'))
  const [listed_in, setListed_in] = useState(sessionStorage.getItem('listed_in'))
  const [title, setTitle] = useState(sessionStorage.getItem('title'))

  sessionStorage.setItem('page', page)
  sessionStorage.setItem('perPage', perPage)
  sessionStorage.setItem('year', year)
  sessionStorage.setItem('listed_in', listed_in)
  sessionStorage.setItem('title', title)


  useEffect(() => {
    fetch(`${API_URL}/shows?&year=${year}&page=${page}&perPage=${perPage}&listed_in=${listed_in}&title=${title}`)
      .then((res) => res.json())
      .then((json) => {
        setShows(json.shows)
        setPagination(Math.ceil(json.total_shows / perPage))
        setLoadingText(true)
        setLoading(false)
        setFound(json.total_shows)
      })
  }, [page, perPage, year, listed_in, title])

  return (
    <>
      <header>
        <nav>
          <div className="search-box">
            <div className="title-search-wrapper">
              <label htmlFor="search" className="text-input-label">
                <input placeholder="Titles" name="search" type="text" defaultValue={title} />
              </label>
              <input type="submit" value="Search" onClick={(e) => { setTitle(e.target.previousSibling.children[0].value); setPage(1) }} />
            </div>
            <div className="dropdowns-container">

              <label htmlFor="year" className="dropdown-wrapper"><span className="dropdown-title">Year</span>
                <select name="year" onChange={(e) => { setYear(e.target.value); setPage(1) }} value={year}>
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
              <label htmlFor="genre" className="dropdown-wrapper"><span className="dropdown-title">Genre</span>
                <select name="genre" onChange={(e) => { setListed_in(e.target.value); setPage(1) }} value={listed_in}>
                  <option defaultValue value="">ALL</option>
                  <option value="action|adventure">Action & Adventure</option>
                  <option value="comedies|stand-up">Comedy</option>
                  <option value="dramas">Drama</option>
                  <option value="docuseries|documentaries">Documentary</option>
                  <option value="sci-fi|fantasy">Sci-Fi & Fantasy</option>
                  <option value="thrillers">Thriller</option>
                </select>
              </label>
              <label htmlFor="perPage" className="dropdown-wrapper"><span className="dropdown-title">Results per page</span>
                <select name="perPage" onChange={(e) => { setPerPage(e.target.value); setPage(1) }} value={perPage}>
                  <option value="100">100</option>
                  <option defaultValue value="20">20</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </label>
            </div>
          </div>
        </nav>
      </header>


      <main className="main-container">

        {loading &&
          <div className="loading-wrapper">
            <Loader type="ThreeDots" color="#f2f2f2" height={80} width={80} />
          </div>
        }

        {!loadingText && <div className="loading-message"> {loadingText} It might take some seconds</div>}
        {loadingText && <div className="found"> {found} Shows Found </div>}
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