import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState ,useEffect } from 'react'

import { Link } from 'react-router-dom';

const TvCards = () => {
const [news,setNews]=useState([])

const fetchNews = () => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then(response => {
        return response.json()  
      })
      .then(data => {
        console.log(data)
        setNews(data)
      })
  }

  useEffect(() => {
    fetchNews();
  },[])


  return (
    <div className='container mt-5'>
        <div className='d-flex justify-content-center mt-4  flex-wrap' >
        {news.map(e=>(
        <>
 <Card style={{ width: '18rem' }} className='m-3'>
   
      <Card.Img variant="top" key={e.show.id} src={e.show.image.medium}  />
      <Card.Body>
        <Card.Title >{e.show.name}</Card.Title>
        <Card.Text>genre: {
            e.show.genres.map((genre,index)=>{
        return <span key={index}>{genre}   </span>
            })}
        </Card.Text>
        <Card.Text alt='N/A'> Ratings: 
         |{e.show.rating.average}|  
        </Card.Text>
        <button><Link to={`Details/${e.show.id}`} >MORE</Link></button>
       
      </Card.Body>
    
    </Card>
    </>
      ))}
    </div>
    </div>
  )
}

export default TvCards