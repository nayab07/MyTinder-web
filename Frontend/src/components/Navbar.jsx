import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { BASE_URL } from "../utils/constant.js"
import { removeUser } from '../utils/userSlice.js';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser())
      return Navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👨🏽‍💻 Shams-Tinder</Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end mx-5 flex">
            {/* User welcome and profile avatar */}
            <li className="mt-2 list-none mx-2 hidden md:block">Welcome {user.firstName}</li>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt={user.firstName} src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-10 w-52 p-2 shadow">
              <li><Link to="profile" className="justify-between">Profile <span className="badge">New</span></Link></li>
              <li><Link to='login'>Login</Link></li>
              <li><Link to="connection">Connection</Link></li>
              <li><Link to="request">Request</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            {/* Display login link when no user is logged in */}
            <Link to="/login" className="btn btn-ghost">Login</Link>
          </div>
        )}
        {/* Mobile Hamburger Menu for small screens */}
        <div className="block md:hidden">
          <button className="btn btn-ghost" onClick={() => alert('Mobile menu clicked')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
