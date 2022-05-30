import { Link } from 'react-router-dom'
import Modal from '../Modal/Modal'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import UserInfo from './UserInfo/UserInfo'
import './Navbar.css'

export default function Navbar() {
  const { isLoggedIn } = useUser()

  const [isLoginActive, setLoginActive] = useState(false)
  const [isRegisterActive, setRegisterActive] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={logo} alt="" />
      </Link>

      {isLoggedIn ? (
        <UserInfo />
      ) : (
        <>
          <div className="navbar-btn-group">
            <button className="navbar-btn" onClick={() => setLoginActive(true)}>
              Login
            </button>
            <button
              className="navbar-btn primary"
              onClick={() => setRegisterActive(true)}
            >
              Register
            </button>
          </div>

          <Modal
            isActive={isLoginActive}
            closeModal={() => setLoginActive(false)}
            title="Login"
          >
            <LoginForm closeModal={() => setLoginActive(false)} />
          </Modal>

          <Modal
            isActive={isRegisterActive}
            closeModal={() => setRegisterActive(false)}
            title="Register"
          >
            <RegisterForm closeModal={() => setRegisterActive(false)} />
          </Modal>
        </>
      )}
    </nav>
  )
}
