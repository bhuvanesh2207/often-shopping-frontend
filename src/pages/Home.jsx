import React from 'react'
import {Link} from 'react-router-dom'
export default function Home() {
  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>Welcome to OftenShopping</h1>
          <p>Discover amazing products at unbeatable prices. Shop smart, shop easy.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/signin"><button className="home-button">Sign In</button></Link>
          <Link to="/signup"><button className="home-button">Sign Up</button></Link>
        </div>
      </div>
    </>
  )
}
