import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../../contexts/UserContext'
import { useAlert } from '../../../contexts/AlertContext'
import {
  BsPerson,
  BsHouseDoor,
  BsCalendar4Week,
  BsBoxArrowRight,
  BsClockHistory,
  BsCurrencyDollar,
} from 'react-icons/bs'
import { capitalize } from '../../../utils/formatting'
import './UserInfo.css'

export default function UserInfo() {
  const { loggedInUser, logout } = useUser()
  const { invokeAlert } = useAlert()
  const [isActive, setActive] = useState(false)

  const navigate = useNavigate()
  const toggleDropdown = () => setActive(!isActive)

  const handleLogout = async (e) => {
    e.preventDefault()
    const response = await logout()
    if (response.isError) {
      return invokeAlert(
        'error',
        `Error Logout: ${capitalize(response.message)}`
      )
    }

    invokeAlert('success', `Berhasil Logout`)
    navigate('/')
  }

  return (
    <div className="user-info">
      <div className="user-avatar" onClick={toggleDropdown}>
        <img
          src={
            loggedInUser.user_avatar
              ? loggedInUser.user_avatar
              : 'https://res.cloudinary.com/quikzens/image/upload/v1652685905/avatar/default.png'
          }
          alt=""
        />
      </div>
      <div className={`user-dropdown ${isActive ? 'active' : ''}`}>
        <Link className="user-dropdown-item" to={`/profile`}>
          <div className="user-dropdown-icon">
            <BsPerson size={20} />
          </div>
          <p>Profile</p>
        </Link>
        {loggedInUser.user_role === 'owner' && (
          <>
            <Link className="user-dropdown-item" to="/transactions">
              <div className="user-dropdown-icon">
                <BsCurrencyDollar size={20} />
              </div>
              <p>Incoming Transaction</p>
            </Link>
            <Link className="user-dropdown-item" to="/houses">
              <div className="user-dropdown-icon">
                <BsHouseDoor size={20} />
              </div>
              <p>My Houses</p>
            </Link>
          </>
        )}
        {loggedInUser.user_role === 'tenant' && (
          <Link className="user-dropdown-item" to="/bookings">
            <div className="user-dropdown-icon">
              <BsCalendar4Week size={19} />
            </div>
            <p>My Booking</p>
          </Link>
        )}
        <Link className="user-dropdown-item" to="/histories">
          <div className="user-dropdown-icon">
            <BsClockHistory size={20} />
          </div>
          <p>History</p>
        </Link>
        <hr />
        <a className="user-dropdown-item" href="/" onClick={handleLogout}>
          <div className="user-dropdown-icon">
            <BsBoxArrowRight size={20} />
          </div>
          <p>Logout</p>
        </a>
      </div>
    </div>
  )
}
