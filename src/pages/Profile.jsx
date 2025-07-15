import React from 'react'
import {Link} from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
export default function Profile() {
  return (
    <>
      
      <button><Link to="/order_history">Order History</Link></button>
      <button><Link to="/view_orders">Current Orders</Link></button>
      <button><Link to="/">LogOut <IoIosLogOut/></Link></button>
    </>
  )
}
