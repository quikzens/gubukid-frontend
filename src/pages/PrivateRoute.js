import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

/**
 * Wrapper component to protect particular route
 * we use conditional rendering base on state to check
 * if there is user login or not
 * if login: render page (children)
 * if not: redirect to home path
 */
export default function PrivatePage(props) {
  const { isLoggedIn, loggedInUser } = useUser()
  const { allowedRoles, children } = props

  if (!isLoggedIn) {
    return <Navigate replace to={'/'} />
  }

  if (allowedRoles.indexOf(loggedInUser.user_role) < 0) {
    return <Navigate replace to={'/'} />
  }

  return children
}
