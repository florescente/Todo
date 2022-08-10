import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

interface User {
  auth: {
    currentUser: boolean
    email: string | null | undefined
  }
}

function AuthRoute() {
  const user = useSelector((state: User) => state.auth.currentUser)
  return user ? <Navigate to="/" /> : <Outlet />
}

export default AuthRoute
