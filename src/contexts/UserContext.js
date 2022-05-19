import React, { createContext, useState, useEffect, useContext } from 'react'
import { API, configForm } from '../config/api'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    invokeAuth()
  }, [])

  const invokeAuth = async () => {
    try {
      const response = await API.get('/auth', { withCredentials: true })
      setLoggedIn(true)
      setLoggedInUser(response.data.data)
    } catch (err) {
      setLoggedIn(false)
      setLoggedInUser({})
    }
  }

  const register = async (registerData) => {
    const registerResult = {
      registeredUserData: null,
      isError: false,
      message: '',
    }

    try {
      await API.post('/register', registerData, configForm)
      invokeAuth()

      return registerResult
    } catch (err) {
      registerResult.message = err.response.data.error
      registerResult.isError = true

      return registerResult
    }
  }

  const login = async (loginData) => {
    const loginResult = {
      loggedUserData: null,
      isError: false,
      message: '',
    }

    try {
      await API.post('/login', loginData, configForm)
      invokeAuth()

      return loginResult
    } catch (err) {
      loginResult.message = err.response.data.error
      loginResult.isError = true

      return loginResult
    }
  }

  const logout = async () => {
    const logoutResult = {
      isError: false,
      message: '',
    }

    try {
      await API.get('/logout', { withCredentials: true })
      localStorage.clear()
      invokeAuth()

      return logoutResult
    } catch (err) {
      logoutResult.message = err.response.data.error
      logoutResult.isError = true

      return logoutResult
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        setLoggedInUser,
        register,
        login,
        logout,
        invokeAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
