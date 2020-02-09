import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./showdetail.css"

import { API_URL } from '../App'

export const ShowDetail = () => {
  const [show, setShow] = useState({})
  let { showId } = useParams()

  useEffect(() => {
    fetch(`${API_URL}/shows/id/${showId}/`)
      .then((res) => res.json())
      .then((json) => {
        setShow(json)
      })
  }, [showId])

  return (
    <>

      <Link className="back-btn" to={`/`}>
        <svg className="back-btn-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27 14.5C27 7.596441 21.4035594 2 14.5 2S2 7.596441 2 14.5 7.5964406 27 14.5 27 27 21.403559 27 14.5zm-19.3388348-.353553l7.4852814-7.485282c.1952622-.195262.5118446-.195262.7071068 0l2.1213203 2.121321c.1952622.195262.1952622.511844 0 .707106L12.9644661 14.5l5.0104076 5.010408c.1952622.195262.1952622.511844 0 .707106l-2.1213203 2.121321c-.1952622.195262-.5118446.195262-.7071068 0l-7.4852814-7.485282c-.19799-.19799-.197989-.509117 0-.707106z" fill="#fff" fillRule="evenodd"></path></svg>
        <span>Back to shows</span>
      </Link>

      <div className="summary">
        <div className="show-overview">
          <div className="title-wrapper">
            <h1>{show.title} </h1>
            <span className="show-duration">{show.duration}</span>
          </div>
          {show.release_year && <div><span className="highlight">Release: </span>{show.release_year}</div>}
          {show.description && <div><span className="highlight">Description: </span>{show.description}</div>}
          {show.cast && <div> <span className="highlight">Cast: </span> {show.cast}</div>}
          {show.listed_in && <div> <span className="highlight">Genres: </span> {show.listed_in}</div>}
        </div>
      </div>
    </>

  )

} 
