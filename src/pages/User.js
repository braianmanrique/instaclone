import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/Profile/Profile';

export default function User() {

  const {username} = useParams()
  return (
    <>
      <h1>
        <Profile username={username} />  
      </h1>      
    
         
    </>
  
  )
}
