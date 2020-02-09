import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./showdetail.css"


export const ShowDetail = () => {
  const [show, setShow] = useState({})
  let { showId } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/shows/id/${showId}/`)
      .then((res) => res.json())
      .then((json) => {
        setShow(json)
        console.log(json)
      })
  }, [showId])

  return (
    <>
      {/* <div className="btn-container"> */}
      <Link className="back-btn" to={`/`}>
        <svg className="back-btn-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M27 14.5C27 7.596441 21.4035594 2 14.5 2S2 7.596441 2 14.5 7.5964406 27 14.5 27 27 21.403559 27 14.5zm-19.3388348-.353553l7.4852814-7.485282c.1952622-.195262.5118446-.195262.7071068 0l2.1213203 2.121321c.1952622.195262.1952622.511844 0 .707106L12.9644661 14.5l5.0104076 5.010408c.1952622.195262.1952622.511844 0 .707106l-2.1213203 2.121321c-.1952622.195262-.5118446.195262-.7071068 0l-7.4852814-7.485282c-.19799-.19799-.197989-.509117 0-.707106z" fill="#fff" fillRule="evenodd"></path></svg>
        <span>Back to shows</span>
      </Link>
      {/* </div> */}
      <div className="summary">
        <div className="show-overview">
          <h1>{show.title} - <span className="show-duration">{show.duration}</span></h1>
          <span>Realease: {show.release_year}</span>
          <div>{show.description}</div>
          <div>Cast: {show.cast}</div>
          <div>Genres: {show.listed_in}</div>
        </div>
      </div>
    </>

  )

} 
