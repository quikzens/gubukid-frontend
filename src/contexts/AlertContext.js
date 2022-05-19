import React, { createContext, useState, useEffect, useContext } from 'react'

export const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alertText, setAlertText] = useState('')
  const [isAlertActive, setAlertActive] = useState(false)
  const [alertType, setAlertType] = useState('success')

  const invokeAlert = (type, text) => {
    setAlertType(type)
    setAlertText(text)
    setAlertActive(true)

    setTimeout(() => {
      setAlertActive(false)
    }, 2000)
  }

  return (
    <AlertContext.Provider
      value={{
        invokeAlert,
        alertText,
        alertType,
        isAlertActive,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within a AlertProvider')
  }
  return context
}
