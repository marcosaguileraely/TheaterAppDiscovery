import React from 'react';
import { Link, useLocation } from "react-router-dom";

import './Detail.css'

export default function App() {

    const location = useLocation()
    const { data } = location.state

    console.log(data)
    console.log(data.id)

    return (
        <div>
            <div className="detail-grid-container">
                
                <div className="detail-header">
                    <Link to={`/`}><h3 >Go back</h3></Link>
                    <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} />
                </div>
                <div className="detail-left"></div>
                <div className="detail-content">
                    <h3>{ `${data.original_title} (#${data.id})`} </h3>
                    <strong>Released on: {data.release_date}</strong>
                    <br />
                    <strong>Original language: {data.original_language}</strong>
                    <p>{data.overview}</p>

                </div>
                <div className="detail-right"></div>
                <div className="detail-footer">
                    Developed by <a href="https://github.com/marcosaguileraely" target="_blank">https://github.com/marcosaguileraely</a>
                </div>
            </div>
        </div>
    )
}