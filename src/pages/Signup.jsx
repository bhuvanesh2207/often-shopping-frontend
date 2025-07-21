import React from 'react'
import {Link} from 'react-router-dom'
export default function Signup() {
  return (
    <>
        <Link to="/admin_signup"><button>Admin Signup</button></Link>
        <br></br>
        <Link to="/customer_signup"><button>Customer SignUp</button></Link>
    </>
  )
}
