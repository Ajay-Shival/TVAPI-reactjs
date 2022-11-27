import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCookies } from 'react-cookie';
import '../components/DetailCss.css'

const DetailsC = () => {
  const {id} = useParams()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
    const [detail, setDetail] = useState([])
  
     // eslint-disable-next-line   
  const [getName,setName] = useState('')
  const [getEmail,setEmail] = useState('')
  const [getNum,setNum] = useState('')
  // eslint-disable-next-line
  const [getCookies,setCookies] = useCookies(['user'])
      useEffect(() => {
     
          fetch(`https://api.tvmaze.com/shows/${id}`)
            .then(response => {
              return response.json()  
            })
            .then(data => {
              console.log(data)
              setDetail(data)
            })
            
        // eslint-disable-next-line 
      },[])

      const summary = detail.summary?.replace(/<[^>]+>/g, '');


 const handleSubmitForm = ()=>{
  setCookies('Name', getName, { path: '/' });
  setCookies('PhoneNumber', getNum, { path: '/' });
  setCookies('Email', getEmail, { path: '/' });
 }

  return (
    <div className='container distTop'>

<h1 key={id} className='' >{detail.name}</h1>
<h3>genre:
{ detail.genres?.map((genre,index)=>{
return <span key={index} className='text-secondary'> {genre} </span>
})}
</h3>
<div className='d-flex flex-wrap'>
<Image key={id} src={detail.image?.medium} className='mx-4 my-3' />
<div className='text-success my-4'>
<h5>language : {detail.language} </h5>
<h5>status: {detail.status}</h5>
<h5>rating: {detail.rating?.average}</h5>
<h5>runtime: {detail.runtime} minutes</h5>
<button onClick={handleShow}>BOOK MY TICKETS</button>
</div>
</div>
<h4 className='mt-5  fi '>
{summary}</h4>


<>


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>BOOK MY TICKETS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form>
          <h3>'{detail.name}' tickets</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={getEmail} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" value={getNum} onChange={(e)=>setNum(e.target.value)} placeholder="Your number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" value={getName} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
        
      </Form.Group>
      
      <Button variant="primary" onClick={handleSubmitForm} type="submit">
        Submit
      </Button>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>

    </div>
  )
}

export default DetailsC